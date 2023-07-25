const { Dog } = require('../db');
require('dotenv').config();
const API_KEY = process.env;
const URL = 'https://api.thedogapi.com/v1/breeds';
const axios = require('axios');
const {Op} = require('sequelize')


const cleanArray = (array) => {
    const limpio = array.map(elemento => {
        return {
            id: elemento.id,
            image: elemento.image.url,
            name: elemento.name,
            heigth: elemento.height.metric,
            weight: elemento.weight.metric,
            life_span: elemento.life_span,
            created: false
        }
    })
    return limpio;
}
const cleanArrayDetail = (array) => {
    const limpio = array.map(elemento => {
        return {
            id: elemento.id,
            image: elemento.image.url,
            name: elemento.name,
            heigth: elemento.height.metric,
            weight: elemento.weight.metric,
            Temperament: elemento.temperament?.split(','), 
            life_span: elemento.life_span,
        }
    });
    return limpio;
}

const createDog = async (name,weightMin,weightMax, heightMin , heightMax, lifeSpan) => {

    const newDog = await Dog.create({name,weightMin,weightMax, heightMin , heightMax, lifeSpan});
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
        dog = await Dog.findByPk(idRaza)
    }
    return dog;
}
    
        
    

const getAllDogs = async () => {
    //buscar en la BDD
    const databaseDogs = await Dog.findAll();
    
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
