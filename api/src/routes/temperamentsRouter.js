const {Router} = require('express');

const temperamentRouter = Router();


temperamentRouter.get("/", (req, res) => {
    res.send("NIY: ESTOY EN GET TEMPERAMENTOS")
});

module.exports = temperamentRouter;
