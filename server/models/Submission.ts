import { Schema, model } from "mongoose";
import { SCHEMAS } from "../constant/enums";

const submissionSchema = new Schema(
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
    questionsAnswers: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: SCHEMAS.QUESTION,
          required: true,
        },
        userAnswer: [
          {
            type: Schema.Types.ObjectId,
            ref: SCHEMAS.ANSWER_OPTION,
          },
        ],
        isCorrect: {
          type: Boolean,
          required: true,
        },
      },
    ],
    score: {
      type: Number,
      required: true,
    },
    timeTaken: {
      type: Number,
      required: true,
    },
    submittedAt: {
      type: Date,
      required: true,
    },
    contestOpenedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Submission = model(SCHEMAS.QUESTION, submissionSchema);
