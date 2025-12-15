import mongoose, { Schema, models } from "mongoose";

const AiHistorySchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "ai"],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default models.AiHistory ||
    mongoose.model("AiHistory", AiHistorySchema);
