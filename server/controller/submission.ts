import type { Request, Response } from "express";
import { formatResponse } from "../utils/common";
import { CONTEST_MESSAGES, SUBMISSION_MESSAGES } from "../constant/message";
import { Submission } from "../models/Submission";
import { Contest } from "../models/Contest";
import { ObjectId } from "mongoose";
import { AnswerOptionType, QuestionType } from "../types/schemas";

const triggerSubmission = async (req: Request, res: Response) => {
  const { contestId } = req.body;
  const userId = req?.user?._id;

  const checkIfSubmissionExists = await Submission.findOne({
    contestId,
    userId,
  });

  if (checkIfSubmissionExists) {
    return res.status(200).json(
      formatResponse({
        message: SUBMISSION_MESSAGES.SUBMISSION_EXISTS,
        data: checkIfSubmissionExists,
        success: false,
      })
    );
  }

  const newSubmission = await Submission.create({
    contestId,
    userId,
    contestOpenedAt: new Date(),
    score: 0,
    timeTaken: 0,
  });
  if (!newSubmission) {
    return res.status(400).json(
      formatResponse({
        message: SUBMISSION_MESSAGES.SUBMISSION_CREATION_FAILED,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: SUBMISSION_MESSAGES.SUBMISSION_CREATION_SUCCESS,
      data: newSubmission,
      success: true,
    })
  );
};

const updateSubmission = async (req: Request, res: Response) => {
  const { _id, questionsAnswers } = req.body;
  if (!_id) {
    return res.status(400).json(
      formatResponse({
        message: SUBMISSION_MESSAGES.SUBMISSION_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const submissionDetails = await Submission.findById(_id);
  if (!submissionDetails) {
    return res.status(400).json(
      formatResponse({
        message: SUBMISSION_MESSAGES.SUBMISSION_NOT_FOUND,
        data: null,
        success: false,
      })
    );
  }
  const contestDetails = await Contest.findById(submissionDetails.contestId)
    .populate("prizeId")
    .populate({
      path: "questions",
      populate: {
        path: "options",
      },
    });

  if (!contestDetails) {
    return res.status(400).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_NOT_FOUND,
        data: null,
        success: false,
      })
    );
  }

  const isAnswerCorrect = (questionId: ObjectId, userAnswer: ObjectId[]) => {
    const questionDetail = contestDetails.questions.find(
      (m: any) => m._id.toString() === questionId.toString()
    ) as QuestionType;

    if (!questionDetail) return false;

    const questionOptions = questionDetail.options as AnswerOptionType[];

    const correctAnswerIds = questionOptions
      .filter((opt: any) => opt.isCorrect)
      .map((opt: any) => opt._id.toString());

    const userAnswerIds = userAnswer.map((ans) => ans.toString());

    if (correctAnswerIds.length !== userAnswerIds.length) {
      return false;
    }

    const allCorrectAnswersSelected = correctAnswerIds.every((correctId) =>
      userAnswerIds.includes(correctId)
    );

    const noIncorrectAnswersSelected = userAnswerIds.every((userAns) =>
      correctAnswerIds.includes(userAns)
    );

    return allCorrectAnswersSelected && noIncorrectAnswersSelected;
  };

  const newQuestionsAnswers = questionsAnswers.map((qa: any) => ({
    questionId: qa.questionId,
    userAnswer: qa.userAnswer,
    isCorrect: isAnswerCorrect(qa.questionId, qa.userAnswer),
  }));

  const timeTaken =
    new Date().getTime() - submissionDetails.contestOpenedAt.getTime();

  const score = newQuestionsAnswers.filter((m: any) => m.isCorrect).length;

  const updatedSubmission = await Submission.findByIdAndUpdate(
    _id,
    {
      questionsAnswers: newQuestionsAnswers,
      submittedAt: new Date(),
      timeTaken,
      score,
    },
    {
      new: true,
    }
  );
  if (!updatedSubmission) {
    return res.status(400).json(
      formatResponse({
        message: SUBMISSION_MESSAGES.SUBMISSION_UPDATE_FAILED,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: SUBMISSION_MESSAGES.SUBMISSION_FETCH_SUCCESS,
      data: updatedSubmission,
      success: true,
    })
  );
};

const deleteSubmission = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json(
      formatResponse({
        message: SUBMISSION_MESSAGES.SUBMISSION_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const deletedSubmission = await Submission.findByIdAndDelete(id);
  if (!deletedSubmission) {
    return res.status(400).json(
      formatResponse({
        message: SUBMISSION_MESSAGES.SUBMISSION_DELETE_FAILED,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: SUBMISSION_MESSAGES.SUBMISSION_DELETE_SUCCESS,
      data: deletedSubmission,
      success: true,
    })
  );
};

const getSubmission = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json(
      formatResponse({
        message: SUBMISSION_MESSAGES.SUBMISSION_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const submission = await Submission.findById(id).populate([
    {
      path: "contestId",
      select: "name description",
    },
    {
      path: "questionsAnswers.questionId",
      select: "question",
      populate: {
        path: "options",
      },
    },
  ]);
  if (!submission) {
    return res.status(400).json(
      formatResponse({
        message: SUBMISSION_MESSAGES.SUBMISSION_NOT_FOUND,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: SUBMISSION_MESSAGES.SUBMISSION_FETCH_SUCCESS,
      data: submission,
      success: true,
    })
  );
};

const getAllSubmission = async (req: Request, res: Response) => {
  const { skip = 0, limit = 10, contestId, userId } = req.query;
  const payload = {
    contestId,
    userId,
  };
  if (!payload.contestId) {
    delete payload.contestId;
  }
  if (!payload.userId) {
    delete payload.userId;
  }
  const contests = await Submission.find(payload).skip(+skip).limit(+limit);
  return res.status(200).json(
    formatResponse({
      message: SUBMISSION_MESSAGES.SUBMISSION_FETCH_SUCCESS,
      data: contests,
      success: true,
    })
  );
};

const getUserSubmission = async (req: Request, res: Response) => {
  const { skip = 0, limit = 10, search } = req.query;
  const userId = req?.user?._id;

  if (search) {
    const pipeline: any[] = [
      {
        $match: { userId },
      },
      {
        $lookup: {
          from: "contests",
          localField: "contestId",
          foreignField: "_id",
          as: "contestId",
        },
      },
      {
        $unwind: {
          path: "$contestId",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            { "contestId.name": { $regex: search, $options: "i" } },
            { "contestId.description": { $regex: search, $options: "i" } },
          ],
        },
      },
      {
        $skip: +skip,
      },
      {
        $limit: +limit,
      },
    ];
    const contests = await Submission.aggregate(pipeline);
    return res.status(200).json(
      formatResponse({
        message: SUBMISSION_MESSAGES.SUBMISSION_FETCH_SUCCESS,
        data: contests,
        success: true,
      })
    );
  } else {
    const contests = await Submission.find({ userId })
      .populate({
        path: "contestId",
      })
      .skip(+skip)
      .limit(+limit);
    return res.status(200).json(
      formatResponse({
        message: SUBMISSION_MESSAGES.SUBMISSION_FETCH_SUCCESS,
        data: contests,
        success: true,
      })
    );
  }
};

const getLeaderboard = async (req: Request, res: Response) => {
  const { id, skip = 0, limit = 10 } = req.params;
  if (!id) {
    return res.status(400).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const leaderboard = await Submission.find({ contestId: id })
    .populate("userId")
    .sort({ score: -1, timeTaken: 1 })
    .skip(+skip)
    .limit(+limit);
  return res.status(200).json(
    formatResponse({
      message: "Leaderboard fetched successfully",
      data: leaderboard,
      success: true,
    })
  );
};

export {
  triggerSubmission,
  updateSubmission,
  deleteSubmission,
  getSubmission,
  getAllSubmission,
  getUserSubmission,
  getLeaderboard,
};
