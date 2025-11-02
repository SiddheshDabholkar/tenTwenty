import { Schema, model } from "mongoose";
import { SCHEMAS } from "../constant/enums";
import { WonbyType } from "../types/schemas";

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

wonBySchema.index({ contestId: 1, userId: 1 }, { unique: true });

export const Wonby = model<WonbyType>(SCHEMAS.WON_BY, wonBySchema);
