

//pequeña validacion para el createDogs

const createValidate = (req, res, next) => {
    const {name,weightMin,weightMax, heightMin , heightMax, lifeSpan} = req.body;
    if(!name) return res.status(400).json({error:'Missing name'})
    if(!weightMin) return res.status(400).json({error:'Missing weight min'})
    if(!weightMax) return res.status(400).json({error:'Missing weight max'})
    if(!heightMin) return res.status(400).json({error:'Missing heigth min'})
    if(!heightMax) return res.status(400).json({error:'Missing heigth max'})
    if(!lifeSpan) return res.status(400).json({error:'Missing Life Span'})
    next();
};

module.exports = createValidate;