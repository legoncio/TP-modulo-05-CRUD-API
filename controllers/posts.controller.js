const createError = require('http-errors')
const Post = require('../models/post.model')

module.exports.list = async (req,res,next) => {

    try{
        const result = await Post.find()
        if (result) {
            res.status(200).json(result)
        }else{
            next(createError(404, 'resource not found'))
        }
    }catch(err){
        next(err)
    }
}

module.exports.detail = async (req,res,next) => {
    try{
        const result  = await Post.findById(req.params.id)
        res.status(200).json(result)
    }catch(err){
        next(err)
    }
}

module.exports.create = async (req,res,next) => {
    try{
        const data = { title, text, author } = req.body
        const result = await Post.create(data)
        res.status(201).json(result)
    }catch(err){
        next(err)
    }
}

module.exports.update = async (req,res,next) => {
    try{
        const data = { title, text, author } = req.body
        const result = await Post.findByIdAndUpdate(req.params.id, data, { new: true })
        if(result){
            res.status(200).json(result)
        }else{
            next(createError(404, 'resource not found'))
        }
    }catch(err){
        next(err)
    }
    
}

module.exports.delete = async (req,res,next) => {
    try{
        const result = await Post.findByIdAndDelete(req.params.id)
        if(result){
            res.status(200).json(result)
        }else{
            next(createError(404, 'resource not found'))
        }
    }catch(err){
        next(err)
    }
}