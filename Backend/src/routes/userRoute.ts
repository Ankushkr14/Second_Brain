import express from 'express';
import { addContent, deleteContent, getAllContent, getBrainSettings, getContentById, getSharedContent, revokeSharedLink, shareContent, toggleBrainPublic } from '../controller/userController';
const userRoute = express.Router();

userRoute.get('/user',()=>{

})

userRoute.post('/content', addContent)

userRoute.get('/content', getAllContent)
userRoute.get('/content/:id',getContentById)

userRoute.delete('/content/:id', deleteContent)

userRoute.put('/brain/toggle', toggleBrainPublic)
userRoute.get('/brain/settings',getBrainSettings)

userRoute.post('/content/:id/share',shareContent)
userRoute.get('/share/:linkId',getSharedContent)
userRoute.delete('/share/:linkId', revokeSharedLink)


export default userRoute;