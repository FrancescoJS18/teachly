import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // opcional si Google OAuth
  provider?: string; // google, local
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  provider: { type: String, default: "local" },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);


