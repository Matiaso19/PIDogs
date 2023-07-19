const {createDog} = require("../controllers/dogsController");


const getDogsHandler = (req, res) => {
    const {name} = req.query;
    if(name !== undefined) {
        res.send(`QUIERO EL DETALLE DE LOS PERROS ${name}`)
    }
    else {

        res.send("NIY: se muestran todas las razas");
    }
}


const getDogsByIdHandler = async(req, res) => {
    const { idRaza } = req.params;

    try {
        const dog = await getDogByID(idRaza);
        res.status(200).json(dog)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const createDogsHandler = async (req, res) => {
    const {image,name,weight, height, life_span} = req.body;
    try {

        const newDog = await createDog(image,name,weight, height, life_span);

        res.status(201).json(newDog);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    
};

module.exports = {
    getDogsHandler,
    getDogsByIdHandler,
    createDogsHandler,
}