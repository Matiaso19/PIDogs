const { Temperament, Dog } = require('../db');
require('dotenv').config();
const API_KEY = process.env;
const URL = 'https://api.thedogapi.com/v1/breeds';
const axios = require('axios');



const getTemperaments = async () => {
    try {
        const dbTemperament = await Temperament.findAll({
            include: [{
                model: Dog,
                attributes: ['name'],
                through: {
                    attributes: []
                }

            }]
        })
        if(!dbTemperament.length) {
            const response = await axios.get(`${URL}?api_key=${API_KEY}`);
            const dogs = response.data;
            const allTemperaments = dogs
            .map((dog) => dog.temperament)
            .reduce((acc, temp) =>{
                if(temp) {
                   const separadosxcomas = temp.split(',')
                   const trimeados = separadosxcomas.map((elemento) => elemento.trim())
                    return [...acc, ...trimeados];
                }
                return acc;
            }, []);    
        
            const uniqueTemperament = [...new Set(allTemperaments)] 
            for (const temp of uniqueTemperament) {
                await Temperament.findOrCreate({where: {name: temp}})
            }
            const getAllDbTemperaments = await Temperament.findAll();
            return getAllDbTemperaments;
        }
        else { return dbTemperament}


        
    } catch (error) {
        res.send(error)
    }
}

module.exports = getTemperaments;