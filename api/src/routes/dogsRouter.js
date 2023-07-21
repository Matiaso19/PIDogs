const {Router} = require('express');
const {getDogsHandler, getDogsByIdHandler, createDogsHandler} = require('../handlers/dogsHandlers')
const createValidate = require('../middlewares/createValidate')

const dogsRouter = Router();



dogsRouter.get("/", getDogsHandler);

dogsRouter.get("/:idRaza", getDogsByIdHandler);

dogsRouter.post("/", createValidate, createDogsHandler);



module.exports = dogsRouter;