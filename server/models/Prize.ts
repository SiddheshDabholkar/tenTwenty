import { Schema, model } from "mongoose";
import { SCHEMAS } from "../constant/enums";

const prizeSchema = new Schema(
  {
    contestId: {
      type: Schema.Types.ObjectId,
      ref: SCHEMAS.CONTEST,
      required: true,
    },
    title: String,
    description: String,
  },
  { timestamps: true }
);

export const Prize = model(SCHEMAS.PRIZE, prizeSchema);
