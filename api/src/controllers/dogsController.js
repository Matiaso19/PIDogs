const { Dog } = require('../db');
require('dotenv').config();
const API_KEY = process.env;
const URL = 'https://api.thedogapi.com/v1/breeds';
const axios = require('axios')

const cleanArray = (array) => {
    const limpio = array.map(elemento => {
        return {
            id: elemento.id,
            image: elemento.image.url,
            name: elemento.name,
            heigth: elemento.height,
            weight: elemento.weight,
            life_span: elemento.life_span,
            created: false
        }
    })
    return limpio;
}

const createDog = async (image,name,weight, height, life_span) => {
    const newDog = await Dog.create({image,name,weight, height, life_span});
    return newDog;
};

const getDogByID = async (idRaza, buscar) => {
    let dog = {} 
    if(buscar === 'api') {
        dog = (await axios.get(`${URL}/${idRaza}?api_key=${API_KEY}`)).data
    } else {
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
    
    const apiDogs = cleanArray(apiDogsCrudo);
    //unificar los datos
    const results = [...databaseDogs, ...apiDogs];

    return results;
     
}
const getDogByName = async (name) => {
    
    const databaseDog = await Dog.findAll({where: {name: name} });
    
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
