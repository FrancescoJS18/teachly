import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
    title: string;
    short: string;
    icon: string;
    color: string;
}

const CourseSchema: Schema = new Schema({
    title: { type: String, required: true },
    short: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
});

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
