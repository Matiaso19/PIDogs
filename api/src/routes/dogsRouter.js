const {Router} = require('express');
const {getDogsHandler, getDogsByIdHandler, getDogsByNameHandler, createDogsHandler} = require('../handlers/dogsHandlers')

const dogsRouter = Router();


dogsRouter.get("/", getDogsHandler);

dogsRouter.get("/name", getDogsByNameHandler);

dogsRouter.get("/:idRaza", getDogsByIdHandler);

dogsRouter.post("/", createDogsHandler);



module.exports = dogsRouter;