import { Router } from "express";
import { deleteMessage, getMessages, saveMessage, updateMessage } from "../controllers/messageControllers.js";

export const messageRouter = Router()

messageRouter.get("/",getMessages)
.post("/",saveMessage)
.patch("/:id",updateMessage)
.delete("/:id",deleteMessage)


