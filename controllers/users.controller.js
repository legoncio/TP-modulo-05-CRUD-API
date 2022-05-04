const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports.login = async (req,res,next) => {

    const email = req.body.email

    try{
        const result = await User.find({ email }).exec()
        if(result.length > 0){
            const user = result[0]
            const match = await user.checkPassword(req.body.password)
            if(match){
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    sub: user.id
                  }, process.env.SECRET);

                  res.json({ access_token: token })
            }else{
                next(createError(401, "invalid credentials"))
            }
        }else{
            next(createError(401, "invalid credentials"))
        }
    }catch (err){
        next(err)
    }
}

module.exports.create = async (req,res,next) => {
    try{
        const data = { name, email, password, bio } = req.body
        const result = await User.create(data)
        res.status(201).json(result)
    }catch (err){
        next(err)
    }
}