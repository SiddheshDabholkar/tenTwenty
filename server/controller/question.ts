import type { Request, Response } from "express";
import { formatResponse } from "../utils/common";
import { QUESTION_MESSAGES } from "../constant/message";
import { Question } from "../models/Question";

const createQuestion = async (req: Request, res: Response) => {
  const { question, type, options } = req.body;
  const userId = req?.user?._id;

  const newQuestion = await Question.create({
    question,
    type,
    options,
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
  return res.status(200).json(
    formatResponse({
      message: QUESTION_MESSAGES.QUESTION_CREATE_SUCCESS,
      data: newQuestion,
      success: true,
    })
  );
};

const updateQuestion = async (req: Request, res: Response) => {
  const { _id } = req.body;
  if (!_id) {
    return res.status(400).json(
      formatResponse({
        message: QUESTION_MESSAGES.QUESTION_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const updatedQuestion = await Question.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
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
  const question = await Question.findById(id);
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
      data: question,
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
