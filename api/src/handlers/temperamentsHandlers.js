const getTemperaments = require('../controllers/temperamentsController')

const getTemperamentHandler = async (req, res) => {
    try {
        const temperaments = await getTemperaments();
        res.status(200).json(temperaments)

    } catch (error) {
        res.status(404).json({error: error.message})
    }
};


module.exports = getTemperamentHandler;