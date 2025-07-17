import { Request, Response } from "express";
import { Content, Link, User } from "../config/database";
import { HttpStatus } from "../config/httpStatus";
import { contentType, contentValidation } from "../middleware/validationMiddleware";
import { findOrCreateTag } from "./tagController";
import { v4 as uuidv4} from 'uuid';

//1. Add Content
export const addContent = async(req:Request, res: Response): Promise<any>=>{
    try{
        const {id} = req.body.userId;
    const user = User.findById({_id: id});
    if(!user){
        return res.status(HttpStatus.USER_NOT_FOUND).json({
            success: false,
            message: "User not found"
        })
    }    
    const content: contentType = contentValidation.parse(req.body);

    const tagId: Array<string> = await findOrCreateTag(content.tags);
    if(tagId.length===0){
        return res.status(HttpStatus.INVALID_INPUT).json({
            success: false,
            message: "Tags are required"
        })
    }

    const result = await Content.create({
        link: content.link,
        type: content.type,
        title: content.title,
        tags: tagId,
        userId: id
    });
    res.status(HttpStatus.SUCCESS).json({
        success: true,
        message: "Content added successfully",
        id: result._id
    })

    }catch(error){
        res.status(HttpStatus.SERVER_ERROR).json({
            success: false,
            message: error
        })
    }
}

//2. Get All Content
export const getAllContent = async(req: Request, res: Response): Promise<any> => {
    try{
        const { id } = req.body.userId;

        const user = await User.findById(id);
        if(!user){
            return res.status(HttpStatus.USER_NOT_FOUND).json({
                success: false,
                message: "User not found"
            })
        }
    
        const contentData = await Content.find({userId: id})
            .populate("userId","firstname lastname")
            .populate("tags","title");

        if(!contentData){
            return res.status(HttpStatus.CONTENT_NOT_FOUND).json({
                success: false,
                message: 'Content not found.'
            })
        }
        res.status(HttpStatus.SUCCESS).json({
            success: true,
            message: "Content fetched successfuly",
            total: contentData.length,
            content: contentData,
            isPublic: user.isPublicBrain,
            brainName: user.publicBrainName
        })
    }catch(error){
        res.status(HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error"
        })
    }
    
}

//3. Get Content by ID
export const getContentById = async(req: Request,res:Response): Promise<any> =>{
    try{
        const { id } = req.body.userId;
        const contentId = req.params.id;

        const user = await User.findById(id);
        if(!user){
            return res.status(HttpStatus.USER_NOT_FOUND).json({
                success: false,
                message: "User not found"
            })
        }

        const contentData = await Content.findById({_id: contentId,userId: id})
            .populate("userId","firstname lastname")
            .populate("tags","title");  

        if(!contentData){
            return res.status(HttpStatus.CONTENT_NOT_FOUND).json({
                success: false,
                message: "Content not found for this user."
            })
        }

        res.status(HttpStatus.SUCCESS).json({
            success: true,
            message: "Content fetched successfully",
            Data: contentData
        })
    }catch(error){
        res.status(HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

//4. Delete Content
export const deleteContent = async (req: Request, res: Response): Promise<any> => {
    try{
        const { id } = req.body.userId;
        const contentId = req.params.id;
        const user = await User.findById({_id: id});
        if(!user){
            return res.status(HttpStatus.USER_NOT_FOUND).json({
                success: false,
                message: "User not found",
            })
        }
        if(!contentId){
            return res.status(HttpStatus.CONTENT_NOT_FOUND).json({
                success: false,
                message: "Content not found."
            })
        }
        const content = await Content.findById({_id: contentId});
        if (!content || !content.userId || content.userId.toString() !== id.toString()) {
            return res.status(HttpStatus.INVALID_ACCESS).json({
                success: false,
                message: 'Content not found'
            });
        }    
        await Content.findOneAndDelete({_id: contentId, userId: id});
        res.status(HttpStatus.SUCCESS).json({
            success: true,
            message: "Content Delete successfully."
        })
    }catch(error){
        res.status(HttpStatus.SERVER_ERROR).json({
            success: true,
            message: "Internal server error."
        })
    } 
}

//5. Share Content
export const shareContent = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.body.userId;
        const contentId = req.params.id;
        const { permission } = req.body;

        if (!userId || !contentId) {
            return res.status(HttpStatus.USER_NOT_FOUND).json({
                success: false,
                message: "User not found or Content not found"
            });
        }
        const shareableToken = uuidv4();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); 

        const newShareLink = await Link.create({
            contentId: contentId,
            userId: userId.id,
            sharedToken: shareableToken,
            permission,
            expiresAt: expiresAt
        });

        res.status(HttpStatus.SUCCESS).json({
            success: true,
            message: "Shareable Link generated",
            shareableLink: `https://second-brain-xi-three.vercel.app/user/share/${newShareLink.sharedToken}`
        });
    } catch (error) {
        res.status(HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
};

//6. Get Shared Content
export const getSharedContent = async (req: Request, res: Response): Promise<any>=>{
    try{
        const userId = req.body.userId;
        const token = req.params.linkId;
        if(!userId){
            return res.status(HttpStatus.INVALID_ACCESS).json({
                success: false,
                message: "User need to be logged in."
            })
        }
        const shareLink = await Link.findOne({sharedToken: token});
        if(!shareLink){
            return res.status(HttpStatus.CONTENT_NOT_FOUND).json({
                success: false,
                message: 'Invalid or expired shareable Link'
            })
        }
        const content = await Content.findById({_id: shareLink.contentId})
            .populate("userId","firstname")
            .populate("tags","title");

        if(!content){
            return res.status(HttpStatus.CONTENT_NOT_FOUND).json({
                success: false,
                message: "Content Not Found",
            })
        }
        res.status(HttpStatus.SUCCESS).json({
            success: true,
            message: "Content fetched successfully",
            permission: shareLink.permission,
            content: content,
        })


    }catch(error){
        res.status(HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

//7. Revoke Shared Link
export const revokeSharedLink = async (req: Request, res: Response): Promise<any> =>{
    try{
        const userId = req.body.userId;
        const token = req.params.linkId;

        if(!token){
            return res.status(HttpStatus.INVALID_ACCESS).json({
                success: false,
                message: "shared Token is missing"
            })
        }

        const shareLink = await Link.findOne({sharedToken: token});
        if(!shareLink){
            return res.status(HttpStatus.CONTENT_NOT_FOUND).json({
                success: false,
                message: "Shared link not found or already revoked"
            })
        }

        const content = await Content.findById(shareLink.contentId);
        if(!content || !content.userId || content.userId.toString() !== userId.id.toString()){
            return res.status(HttpStatus.INVALID_ACCESS).json({
                success: false,
                message: "Unauthorised to revoke this link"
            })
        }

        await Link.deleteOne({sharedToken: token});
        res.status(HttpStatus.SUCCESS).json({
            success: true,
            message: "Shareable link revoked successgfully"
        })
    }catch(error){
        res.status(HttpStatus.SERVER_ERROR).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

//8. Toggle Brain Public/Private
export const toggleBrainPublic = async (req: Request, res: Response): Promise<any> => {
    try{
        const { id } = req.body.userId;  
        const { isPublic } = req.body;

        if(!id){  
            return res.status(HttpStatus.INVALID_INPUT).json({
                success: false,
                message: "No UserId found"
            })
        }
        if(isPublic === undefined){
            return res.status(HttpStatus.INVALID_INPUT).json({
                success: false,
                message: "isPublic field is required"
            })
        }

        const user = await User.findById(id);  
        if (!user) {
            return res.status(HttpStatus.USER_NOT_FOUND).json({
                success: false,
                message: "User not found"
            });
        }

        const updateUser = await User.findByIdAndUpdate(
            id, 
            {
                isPublicBrain: isPublic,
                publicBrainName: `${user.firstname}'s Brain`  
            },
            { new: true }
        )

        if(!updateUser){
            return res.status(HttpStatus.USER_NOT_FOUND).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(HttpStatus.SUCCESS).json({
            success: true,
            message: isPublic ? "Brain is now public" : "Brain is now private",
            isPublic: updateUser.isPublicBrain,
            brainName: updateUser.publicBrainName,
            shareableLink: isPublic ? `https://second-brain-xi-three.vercel.app/brain/${id}` : null
        })
    }catch(error){
        res.status(HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

//9. Get Public Brain
export const getPublicBrain = async (req: Request, res: Response): Promise<any> =>{
    try{
        const brainUserId = req.params.userId;
        const user = await  User.findById(brainUserId);

        if(!user || !user.isPublicBrain){
            return res.status(HttpStatus.CONTENT_NOT_FOUND).json({
                success: false,
                message: "Public brain is not accessible"
            })
        }

        const contentData = await Content.find({userId : brainUserId})
            .populate("userId","firstname lastname")
            .populate("tags","title");

        if(!contentData || contentData.length === 0){
            return res.status(HttpStatus.CONTENT_NOT_FOUND).json({
                success: true,
                message: "No content found in this public brain",
                content: []
            })
        }

        res.status(HttpStatus.SUCCESS).json({
            success: true,
            message: "Public brain content is fetched successfully",
            brainOwner: {
                name: user.publicBrainName,
            },
            content: contentData,
            total: contentData.length
        });
    }catch(error){
        res.status(HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}


//10. Get Brain Settings
export const getBrainSettings = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.body.userId;
        
        const user = await User.findById(id);
        if (!user) {
            return res.status(HttpStatus.USER_NOT_FOUND).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(HttpStatus.SUCCESS).json({
            success: true,
            message: "Brain settings fetched successfully",
            settings: {
                isPublic: user.isPublicBrain || false,
                brainName: user.publicBrainName || `${user.firstname}'s Brain`,
                shareableLink: user.isPublicBrain ? `https://second-brain-xi-three.vercel.app/brain/${id}` : null
            }
        });

    } catch (error) {
        res.status(HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
