import Message from "../models/Message.js"

export const getMessages = async (req,res,next)=>{
    try {
        const messages = await Message.find({}).sort({ createdAt: 1 });
        res.send(messages)
    } catch (error) {
        next({status:500,messgae:error.message})
    }
}


export const saveMessage = async (req,res,next)=>{
    try {
        const newMessage = await Message.create(req.body)

        res.send(newMessage)
    } catch (error) {
        next({status:400,message:error.message})
    }
}



export const updateMessage = async (req,res,next)=>{
    try {
        const {id}=req.params
        const updatedMessage = await Message.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
        res.send(updatedMessage)
    } catch (error) {
        next({status:500,messgae:error.message})
    }
}



export const deleteMessage = async (req,res,next)=>{
    try {
        const {id}=req.params
        const removedMessage = await Message.findByIdAndDelete(id)
        if(!removedMessage){
            next({status:404,message:"the message does not exist!"})
            return
        }
        console.log(removedMessage)
        res.send({message:"successfully deleted!"})
    } catch (error) {
        next({status:500,messgae:error.message})
    }
}