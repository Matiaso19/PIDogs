

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
    res.send("NIY:ESTOY EN CREACION DE DOGS")
};

module.exports = {
    getDogsHandler,
    getDogsByIdHandler,
    createDogsHandler,
}