import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    userId: String,
    courseId: String,
    score: Number,
    passed: Boolean,
  },
  { timestamps: true }
);

export default mongoose.models.Exam ||
  mongoose.model("Exam", ExamSchema);
