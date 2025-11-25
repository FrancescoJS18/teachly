import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    short: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
});

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);


