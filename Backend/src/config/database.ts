import mongoose from 'mongoose';

const contentTypes = ['image','video','article','audio'];

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true},
    lastname : { type: String, required: true},
    email : { type: String, required: true, unique: true},
    password : { type: String, required: true, minLength: 8 }
})

const contentSchema = new mongoose.Schema({
    link: {type: String},
    type: {type: String, enum: contentTypes, required: true},
    title: {type: String, required: true},
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true}
})

const tagSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true}  
})

const permissionType = ['read','edit','none'];
const linkSchema = new mongoose.Schema({
    contentId: {type:mongoose.Types.ObjectId, ref: "Content", required: true},
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    sharedToken: {type: String, uniquie: true, required: true},
    permission: {type:String, enum: permissionType, default:'read'},
    createdAt: {type: Date,default: Date.now},
    expiresAt: {type: Date},
})

const User = mongoose.model('User', userSchema);
const Tag = mongoose.model('Tag', tagSchema);
const Content = mongoose.model('Content', contentSchema);
const Link = mongoose.model('Link', linkSchema);

export {
    User,
    Tag,
    Content,
    Link
}