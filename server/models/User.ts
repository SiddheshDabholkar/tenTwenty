import { Schema, model } from "mongoose";
import { USER_ROLE, SCHEMAS } from "../constant/enums";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: USER_ROLE,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model(SCHEMAS.USER, userSchema);
