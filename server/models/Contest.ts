import { Schema, model } from "mongoose";
import { SCHEMAS, USER_ROLE } from "../constant/enums";
import { ContestType } from "../types/schemas";

const contestSchema = new Schema(
  {
    name: String,
    description: String,
    startDateTime: Date,
    endDateTime: Date,
    prizeId: {
      type: Schema.Types.ObjectId,
      ref: SCHEMAS.PRIZE,
      required: true,
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
    },
    allowedRole: [
      {
        type: String,
        enum: USER_ROLE,
      },
    ],
  },

  { timestamps: true }
);

export const Contest = model<ContestType>(SCHEMAS.CONTEST, contestSchema);
