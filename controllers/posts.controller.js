const Post = require('../models/post.model')

module.exports.list = async (req,res,next) => {

    try{
        const result = await Post.find()
        if (result) {
            res.status(200).json(result)
        }else{
            res.status(404).json({"message": "no posts found"})
        }
    }catch{
        next()
    }
}

module.exports.detail = async (req,res,next) => {
    try{
        const result  = await Post.findById(req.params.id)
        res.status(200).json(result)
    }catch{
        res.status(404).json({"message": "post not found"})
        next()
    }
}

module.exports.create = async (req,res,next) => {
    try{
        const data = { title, text, author } = req.body
        const result = await Post.create(data)
        res.status(201).json(result)
    }catch{
        res.status(400).json({"code": "bad_request"})
        next()
    }
}

module.exports.update = async (req,res,next) => {
    try{
        const data = { title, text, author } = req.body
        const result = await Post.findByIdAndUpdate(req.params.id, data, { new: true })
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({"message": "post not found"})
        }
    }catch{
        next()
    }
    
}

module.exports.delete = async (req,res,next) => {
    try{
        const result = await Post.findByIdAndDelete(req.params.id)
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({"message": "post not found"})
        }
    }catch{
        next()
    }
}