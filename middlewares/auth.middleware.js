const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports.checkAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if(authHeader){
        const token = authHeader.split(" ")[1]

        try{
            const decoded = jwt.verify(token, process.env.SECRET)
            const user = await User.findById(decoded.sub).exec()
            if(user && user.active){
                req.user = user
                next()
            }else{
                res.status(401).json({ message: 'unauthorized' })
            }
        }catch(err){
            res.status(401).json({ message: 'unauthorized' })
        }
    }else{
        res.status(401).json({ message: 'unauthorized' })
    }
    
}