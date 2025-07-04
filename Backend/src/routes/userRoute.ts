import express from 'express';
import { addContent, deleteContent, getAllContent, getContentById, getSharedContent, revokeSharedLink, shareContent } from '../controller/userController';
const userRoute = express.Router();

userRoute.get('/user',()=>{

})

userRoute.post('/content', addContent)

userRoute.get('/content', getAllContent)
userRoute.get('/content/:id',getContentById)

userRoute.delete('/content/:id', deleteContent)

userRoute.post('/content/:id/share',shareContent)
userRoute.get('/share/:linkId',getSharedContent)
userRoute.delete('/share/:linkId', revokeSharedLink)


export default userRoute;