// BUILD YOUR SERVER HERE

//Imports
const express = require('express')
const Model = require('./users/model')

//Instance of express
const server = express()
//Global middleware
server.use(express.json())

//Endpoints

server.get('/hi-guys', (req, res) =>{
    res.json({message:'up and running... time to code baby'})
})

server.get('/api/users', async(req, res)=>{
    try{
        const mods =await Model.find()
        // console.log(mods)
        res.status(200).json(mods)
    }catch(err){
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
})

server.get('/api/users/:id', async(req,res)=>{
    try{
        const { id } = req.params
        const ModById = await Model.findById(id)
        console.log((ModById==undefined), (ModById))
        if(ModById){
            res.status(200).json(ModById)
        }else{
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }
        
    }catch(err){
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
})

server.post('/api/users', async (req,res) =>{
    try{
        
        const { name, bio }= req.body
        if(name && bio){
            const addUser = await Model.insert({name,bio})
            res.status(201).json(addUser)
        }else{
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }
        
        
    }catch(err){
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }
})

server.put('/api/users/:id', async(req,res)=>{
    try{
        const { id } = req.params
        const { name, bio } = req.body
        const updatedModel = await Model.update(id,{name,bio})
        if(!updatedModel){
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else if(name && bio){
            res.json(updatedModel)
        }else{
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }
    }catch(err){
        res.status(500).json({ message: "The user information could not be modified" })
    }
})

server.delete('/api/users/:id', async(req,res)=>{
    try{
        const deletedUser = await Model.remove(req.params.id)
        if(deletedUser){
            res.json(deletedUser)
        }else
            res.status(404).json({ message: "The user with the specified ID does not exist" })
    }catch(err){
        res.status(500).json({ message: "The user could not be removed" })
    }
})






module.exports = server; // EXPORT YOUR SERVER instead of {}
