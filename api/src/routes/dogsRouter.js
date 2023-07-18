const {Router} = require('express');

const dogsRouter = Router();

dogsRouter.get("/", (req, res) => {
    res.send("NIY: ESTOY EN DOGS");
});

dogsRouter.get("/name", (req, res) => {
    const {name} = req.query;
    res.send(`NIY:ESTOY EN DOGS POR NOMBRE: ${name}`)
});
dogsRouter.get("/:idRaza", (req, res) => {
    res.send("NIY:ESTOY EN DOGS POR ID");
});


dogsRouter.post("/", (req, res) => {
    res.send("NIY:ESTOY EN CREACION DE DOGS")
})


module.exports = dogsRouter;