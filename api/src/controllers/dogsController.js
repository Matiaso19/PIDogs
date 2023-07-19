const { Dog } = require('../db');
require('dotenv').config();
const API_KEY = process.env;
const URL = 'https://api.thedogapi.com/v1/breeds?api_key=';
const axios = require('axios')

const createDog = async (image,name,weight, height, life_span) => {
    const newDog = await Dog.create({image,name,weight, height, life_span});
    return newDog;
};

/*const getDogs = async (req, res) => {
    const dogs = await axios.get(`${URL}${API_KEY}`);
    
    return dogs;
}*/

module.exports = {
    createDog,
}
