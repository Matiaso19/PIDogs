const { Dog, Temperament } = require('../db');
require('dotenv').config();
const API_KEY = process.env;
const URL = 'https://api.thedogapi.com/v1/breeds';
const axios = require('axios');
const {Op} = require('sequelize');

const cleanArraydb = (array) => {
    const limpio = array.map(elemento => {
        
        return {
            
            id: elemento.id,
            name: elemento.name,
            heightMin: elemento.heightMin,
            heightMax: elemento.heightMax,
            weightMin: elemento.weightMin,
            weightMax: elemento.weightMax,
            life_span: elemento.lifeSpan,
            temperament: elemento.dataValues.temperaments.map(elem => elem.name).join(', '),
            image: elemento.image,
            created: elemento.created
            
        }
    })

    return limpio;
}
const cleanArraydbDetail = (array) => {
    const limpio = array.map(elemento => {
        
        return {
            
            id: elemento.id,
            image: elemento.image,
            name: elemento.name,
            heightMin: elemento.heightMin,
            heightMax: elemento.heightMax,
            weightMin: elemento.weightMin,
            weightMax: elemento.weightMax,
            life_span: elemento.lifeSpan,
            temperament: elemento.dataValues.temperaments,
            created: elemento.created
            
            
        }
    })

    return limpio;
}

const cleanArray = (array) => {
    const limpio = array.map(elemento => {
        let weight = elemento.weight.metric.split('-')
        let height = elemento.height.metric.split('-')
        let life_span = elemento.life_span.split('-')
        
        let weightMin = parseInt(weight[0])
        let weightMax = parseInt(weight[1])
        let heightMin = parseInt(height[0])
        let heightMax = parseInt(height[1])
        let life_span_min = parseInt(life_span[0])
        let life_span_max = parseInt(life_span[1])
        
        
        return {
            id: elemento.id,
            image: elemento.image.url,
            name: elemento.name,
            heightMin: heightMin ? heightMin : heightMax,
            heightMax: heightMax ? heightMax : heightMin,
            weightMin: weightMin ? weightMin : weightMax,
            weightMax: weightMax ? weightMax : weightMin,
            life_span_min: life_span_min ? life_span_min : life_span_max,
            life_span_max: life_span_max ? life_span_max : life_span_min,
            temperament: elemento.temperament,
            created: false
        }
    })
    return limpio;
}
const cleanArrayDetail = (array) => {
    const limpio = array.map(elemento => {
        let weight = elemento.weight.metric.split('-')
        let height = elemento.height.metric.split('-')
        let life_span = elemento.life_span.split('-')
        
        let weightMin = parseInt(weight[0])
        let weightMax = parseInt(weight[1])
        let heightMin = parseInt(height[0])
        let heightMax = parseInt(height[1])
        
        return {
            id: elemento.id,
            image: elemento.image.url,
            name: elemento.name,
            heightMin: heightMin ? heightMin : heightMax,
            heightMax: heightMax ? heightMax : heightMin,
            weightMin: weightMin ? weightMin : weightMax,
            weightMax: weightMax ? weightMax : weightMin,
            
            temperament: elemento.temperament,
            life_span: elemento.life_span,
        }
    });
    return limpio;
}

const createDog = async (name,weightMin,weightMax, heightMin , heightMax, lifeSpan, temperaments, image) => {

    const newDog = await Dog.create({name,weightMin,weightMax, heightMin , heightMax, lifeSpan, image});
    await newDog.addTemperaments(temperaments)
    return newDog;
};

const getDogByID = async (idRaza, buscar) => {
    let dog = {}
    if(buscar === 'api') {
        //buscamos en la API y filtramos segun el ID
        const detail = ((await axios.get(`${URL}?api_key=${API_KEY}`)).data).filter(elemento => elemento.id == idRaza);
        //limpiamos lo devuelto con una funcion

        dog = cleanArrayDetail(detail)  
        
    } else {
        //sino buscamos en la BDD
        const dogBuscado = await Dog.findByPk(idRaza, {include:{model: Temperament, attributes:["name"], through: {attributes:[]}}})
     
        const foundDog = [dogBuscado]
        dog = cleanArraydbDetail(foundDog)
    }
    return dog;
}
    
        
    

const getAllDogs = async () => {
    //buscar en la BDD
    const databaseDogsCrudo = await Dog.findAll({
        include: [{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes :[]
            }
        }]
    });
    //console.log(databaseDogsCrudo);
    const databaseDogs = cleanArraydb(databaseDogsCrudo);
    
    //buscar en la API
    const apiDogsCrudo = (await axios.get(`${URL}?api_key=${API_KEY}`)).data
    //limpiamos el array para traer solo lo que necesitamos
    //console.log(apiDogsCrudo);
    
    const apiDogs = cleanArray(apiDogsCrudo);
    //unificar los datos
    const results = [...databaseDogs, ...apiDogs];

    return results;
     
}
const getDogByName = async (name) => {
    
    const databaseDog = await Dog.findAll({where: {name: { [Op.iLike]: `%${name}%` } } });
    const apiDogCrudo = (await axios.get(`${URL}?api_key=${API_KEY}`)).data;
    const apiDog = cleanArray(apiDogCrudo);
    const filteredDog = apiDog.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
    return  [...databaseDog, ...filteredDog]
    
}

module.exports = {
    createDog,
    getDogByID,
    getAllDogs,
    getDogByName
}
