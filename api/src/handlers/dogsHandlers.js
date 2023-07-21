const {createDog, getDogByID, getDogByName, getAllDogs} = require("../controllers/dogsController");
const validateCreate = require('../middlewares/createValidate')


const getDogsHandler = async (req, res) => {
    const {name} = req.query;
    let resultado = {}
    //si tengo name, busco por nombre
    if(name) {
        resultado = await getDogByName(name)
    //si encuentra alguna coicidencia, que la devuelva, sino que devuelva el error correspondiente
        const getDog = (resultado.length > 0) ? res.status(200).json(resultado) : res.status(400).send({error: "Breed not found, please try another name"})        
      } else {
    // si no tengo name, traigo todos los perros
        resultado = await getAllDogs()
        return res.status(200).json(resultado)
    }
}
        
        
    
    


const getDogsByIdHandler = async(req, res) => {
    const { idRaza } = req.params;
    //me fijo con la funcion isNaN si el id que me pasaron es de la BDD o de la API y le paso ese dato (buscar) a getdogbyID
    const buscar = isNaN(idRaza) ? "bdd" : "api"

    try {
        
        const dog = await getDogByID(idRaza, buscar);
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