import mongoose, { Schema } from "mongoose"

const TagSchema = new Schema({
    title: {
        type: String
    }
})

const TagsModel = mongoose.model("Tag", TagSchema)

export default TagsModel;
