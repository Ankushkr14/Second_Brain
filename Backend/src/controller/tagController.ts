import mongoose from "mongoose";
import { Tag } from "../config/database";

export const findOrCreateTag = async (tags: string[]): Promise<any>=>{
    try{
        if(!tags || !Array.isArray(tags) || tags.length === 0){
           return [];
        }

        const existingTags = await Tag.find({title: {$in: tags}});
        const existingTagMap = new Map(existingTags.map(tag=> [tag.title, tag._id]));

        let tagId: mongoose.Types.ObjectId[] = [...existingTagMap.values()];
        for(const tag of tags){
            if(!existingTagMap.has(tag)){
                const newTag = await Tag.findOneAndUpdate(
                    {title: tag},
                    {title: tag},
                    {upsert: true, new : true}
                );
                tagId.push(newTag._id);
            }
        }

        return tagId;

    }catch(err){
        console.log('Error: ',(err as Error).message);
        return [];
    }
}