import { Schema, model } from "mongoose";
import { SCHEMAS } from "../constant/enums";
import { PrizeType } from "../types/schemas";

const wonBySchema = new Schema(
  {
    contestId: {
      type: Schema.Types.ObjectId,
      ref: SCHEMAS.CONTEST,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: SCHEMAS.USER,
      required: true,
    },
    submissionId: {
      type: Schema.Types.ObjectId,
      ref: SCHEMAS.SUBMISSION,
      required: true,
    },
  },
  { timestamps: true }
);

export const Prize = model<PrizeType>(SCHEMAS.WON_BY, wonBySchema);
