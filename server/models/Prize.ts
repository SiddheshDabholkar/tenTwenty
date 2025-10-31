import { Schema, model } from "mongoose";
import { SCHEMAS } from "../constant/enums";
import { PrizeType } from "../types/schemas";

const prizeSchema = new Schema(
  {
    title: String,
    description: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: SCHEMAS.USER,
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: SCHEMAS.USER,
      required: true,
    },
  },
  { timestamps: true }
);

export const Prize = model<PrizeType>(SCHEMAS.PRIZE, prizeSchema);
