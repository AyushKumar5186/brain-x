import mongoose, { Schema } from "mongoose";

const ContentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["youtube", "twitter"],
    },
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
})

const ContentModel = mongoose.model("Content", ContentSchema)

export default ContentModel;