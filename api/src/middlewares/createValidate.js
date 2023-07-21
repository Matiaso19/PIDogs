

//pequeña validacion para el createDogs

const createValidate = (req, res, next) => {
    const {name, weight, height, life_span} = req.body;
    if(!name) return res.status(400).json({error:'Missing name'})
    if(!weight) return res.status(400).json({error:'Missing weight'})
    if(!height) return res.status(400).json({error:'Missing heigth'})
    if(!life_span) return res.status(400).json({error:'Missing Life Span'})
    next();
};

module.exports = createValidate;