import { Schema, model } from "mongoose";
import { SCHEMAS } from "../constant/enums";
import { AnswerOptionType } from "../types/schemas";

const answerOptionSchema = new Schema(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      ref: SCHEMAS.QUESTION,
      required: true,
    },
    option: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
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
  },
  { timestamps: true }
);

export const AnswerOption = model<AnswerOptionType>(SCHEMAS.ANSWER_OPTION, answerOptionSchema);
