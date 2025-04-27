import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email format",
      ],
    },
    status: {
      type: String,
      enum: ["single", "married", "divorced"],
      default: "single",
    },
  },
  { timestamps: true }
);

UserSchema.index({ createdAt: 1 });

export default mongoose.models.User || mongoose.model("User", UserSchema);
