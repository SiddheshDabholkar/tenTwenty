import { Schema, model } from "mongoose";
import { QUESTIONS_TYPES, SCHEMAS } from "../constant/enums";

const userSchema = new Schema(
  {
    name: {
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
      enum: QUESTIONS_TYPES,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model(SCHEMAS.USER, userSchema);
