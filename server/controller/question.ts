import type { Request, Response } from "express";
import { formatResponse } from "../utils/common";
import { QUESTION_MESSAGES } from "../constant/message";
import { Question } from "../models/Question";
import { AnswerOption } from "../models/AnswerOption";
import { QUESTIONS_TYPES } from "../constant/enums";
import { Contest } from "../models/Contest";
import { validateQuestionPayload } from "../utils/validation";

const createQuestion = async (req: Request, res: Response) => {
  const { question, type, options } = req.body;
  const userId = req?.user?._id;

  const validatedError = validateQuestionPayload({
    question,
    type,
    options,
  });
  if (validatedError) {
    return res.status(400).json(
      formatResponse({
        message: validatedError,
        data: null,
        success: false,
      })
    );
  }

  const newQuestion = await Question.create({
    question,
    type,
    createdBy: userId,
    updatedBy: userId,
  });

  if (!newQuestion) {
    return res.status(400).json(
      formatResponse({
        message: QUESTION_MESSAGES.QUESTION_CREATE_FAILED,
        data: null,
        success: false,
      })
    );
  }

  const answerOptions = await AnswerOption.insertMany(
    options.map((o: any) => ({
      ...o,
      createdBy: userId,
      updatedBy: userId,
      questionId: newQuestion._id,
    }))
  );

  const updatedQuestion = await Question.findByIdAndUpdate(
    newQuestion._id,
    {
      options: answerOptions.map((o) => o._id),
    },
    { new: true }
  );

  return res.status(200).json(
    formatResponse({
      message: QUESTION_MESSAGES.QUESTION_CREATE_SUCCESS,
      data: updatedQuestion,
      success: true,
    })
  );
};

const updateQuestion = async (req: Request, res: Response) => {
  const { _id, question, type, options } = req.body;
  const userId = req?.user?._id;
  if (!_id) {
    return res.status(400).json(
      formatResponse({
        message: QUESTION_MESSAGES.QUESTION_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }

  const validatedError = validateQuestionPayload({
    question,
    type,
    options,
  });
  if (validatedError) {
    return res.status(400).json(
      formatResponse({
        message: validatedError,
        data: null,
        success: false,
      })
    );
  }

  const questionDetails = await Question.findById(_id);
  if (!questionDetails) {
    return res.status(400).json(
      formatResponse({
        message: QUESTION_MESSAGES.QUESTION_NOT_FOUND,
        data: null,
        success: false,
      })
    );
  }
  const usedBy = await Contest.find({
    questions: { $in: [_id] },
  }).countDocuments();
  if (usedBy > 0) {
    return res.status(400).json(
      formatResponse({
        message: QUESTION_MESSAGES.QUESTION_USED_BY_CONTEST,
        data: null,
        success: false,
      })
    );
  }

  if (type === QUESTIONS_TYPES.SWITCH) {
    await AnswerOption.deleteMany({ questionId: _id });
    const updatedInfo = await AnswerOption.insertMany(
      options.map((o: any) => ({
        ...o,
        createdBy: userId,
        updatedBy: userId,
        questionId: _id,
      }))
    );
    const updatedQuestion = await Question.findByIdAndUpdate(
      _id,
      {
        question,
        type,
        updatedBy: userId,
        options: updatedInfo.map((o) => o._id),
      },
      {
        new: true,
      }
    );
    if (!updatedQuestion) {
      return res.status(400).json(
        formatResponse({
          message: QUESTION_MESSAGES.QUESTION_UPDATE_FAILED,
          data: null,
          success: false,
        })
      );
    }
    return res.status(200).json(
      formatResponse({
        message: QUESTION_MESSAGES.QUESTION_UPDATE_SUCCESS,
        data: updatedQuestion,
        success: true,
      })
    );
  } else {
    options.forEach(async (o: any) => {
      if (o._id) {
        await AnswerOption.findByIdAndUpdate(o._id, {
          option: o.option,
          isCorrect: o.isCorrect,
          updatedBy: userId,
        });
      }
    });
  }

  const updatedQuestion = await Question.findByIdAndUpdate(
    _id,
    {
      question,
      type,
      updatedBy: userId,
    },
    {
      new: true,
    }
  );
  if (!updatedQuestion) {
    return res.status(400).json(
      formatResponse({
        message: QUESTION_MESSAGES.QUESTION_UPDATE_FAILED,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: QUESTION_MESSAGES.QUESTION_UPDATE_SUCCESS,
      data: updatedQuestion,
      success: true,
    })
  );
};

const deleteQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json(
      formatResponse({
        message: QUESTION_MESSAGES.QUESTION_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const deletedQuestion = await Question.findByIdAndDelete(id);
  if (!deletedQuestion) {
    return res.status(400).json(
      formatResponse({
        message: QUESTION_MESSAGES.QUESTION_DELETE_FAILED,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: QUESTION_MESSAGES.QUESTION_DELETE_SUCCESS,
      data: deletedQuestion,
      success: true,
    })
  );
};

const getQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json(
      formatResponse({
        message: QUESTION_MESSAGES.QUESTION_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const question = await Question.findById(id).populate("options");
  const usedBy = await Contest.find({
    questions: { $in: [id] },
  }).countDocuments();
  if (!question) {
    return res.status(400).json(
      formatResponse({
        message: QUESTION_MESSAGES.QUESTION_NOT_FOUND,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: QUESTION_MESSAGES.QUESTION_FETCH_SUCCESS,
      data: {
        ...question.toObject(),
        usedBy,
      },
      success: true,
    })
  );
};

const getAllQuestion = async (req: Request, res: Response) => {
  const { skip = 0, limit = 10, search = "" } = req.query;
  const payload = {
    ...(search
      ? {
          question: { $regex: search, $options: "i" },
        }
      : {}),
  };
  const contests = await Question.find(payload).skip(+skip).limit(+limit);
  return res.status(200).json(
    formatResponse({
      message: QUESTION_MESSAGES.QUESTION_FETCH_SUCCESS,
      data: contests,
      success: true,
    })
  );
};

export {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  getAllQuestion,
};
