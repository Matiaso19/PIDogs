

const getDogsHandler = (req, res) => {
    res.send("NIY: ESTOY EN DOGS");
}

const getDogsByNameHandler = (req, res) => {
    const {name} = req.query;
    res.send(`NIY:ESTOY EN DOGS POR NOMBRE: ${name}`)
};

const getDogsByIdHandler = (req, res) => {
    res.send("NIY:ESTOY EN DOGS POR ID");
};

const createDogsHandler = (req, res) => {
    res.send("NIY:ESTOY EN CREACION DE DOGS")
};

module.exports = {
    getDogsHandler,
    getDogsByNameHandler,
    getDogsByIdHandler,
    createDogsHandler,
}