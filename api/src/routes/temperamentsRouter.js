const {Router} = require('express');
const getTemperamentHandler = require('../handlers/temperamentsHandlers')

const temperamentRouter = Router();

temperamentRouter.get("/", getTemperamentHandler)

module.exports = temperamentRouter;


