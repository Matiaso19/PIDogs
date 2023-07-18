

const getDogsHandler = (req, res) => {
    const {name} = req.query;
    if(name !== undefined) {
        res.send(`QUIERO EL DETALLE DE LOS PERROS ${name}`)
    }
    else {

        res.send("NIY: se muestran todas las razas");
    }
}


const getDogsByIdHandler = (req, res) => {
    const { idRaza } = req.params;
   
    res.send(`el detalle del usuario ${idRaza}`);
};

const createDogsHandler = (req, res) => {
    const {imagen,nombre,altura, peso, añosDeVida} = req.body;
    res.send(`Creando un nuevo dog con los datos: 
    imagen: ${imagen},
    nombre: ${nombre},
    altura: ${altura},
    peso: ${peso},
    añosDeVida: ${añosDeVida},
    `)
};

module.exports = {
    getDogsHandler,
    getDogsByIdHandler,
    createDogsHandler,
}