import { Schema, model } from "mongoose";
import { SCHEMAS, USER_ROLE } from "../constant/enums";

const contestSchema = new Schema(
  {
    name: String,
    description: String,
    startDateTime: Date,
    endDateTime: Date,
    prizeId: {
      type: Schema.Types.ObjectId,
      ref: SCHEMAS.PRIZE,
    },
    wonBy: {
      type: Schema.Types.ObjectId,
      ref: SCHEMAS.WON_BY,
    },
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
    for: [
      {
        type: String,
        enum: USER_ROLE,
      },
    ],
  },

  { timestamps: true }
);

export const Contest = model(SCHEMAS.CONTEST, contestSchema);
