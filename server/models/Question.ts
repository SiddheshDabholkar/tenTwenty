import { Schema, model } from "mongoose";
import { QUESTIONS_TYPES, SCHEMAS } from "../constant/enums";
import { QuestionType } from "../types/schemas";

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: QUESTIONS_TYPES,
    },
    options: [
      {
        type: Schema.Types.ObjectId,
        ref: SCHEMAS.ANSWER_OPTION,
      },
    ],
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

export const Question = model<QuestionType>(SCHEMAS.QUESTION, questionSchema);
