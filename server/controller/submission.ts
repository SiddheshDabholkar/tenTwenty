import type { Request, Response } from "express";
import { formatResponse } from "../utils/common";
import { SUBMISSION_MESSAGES } from "../constant/message";
import { Submission } from "../models/Submission";

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
  const { _id } = req.body;
  if (!_id) {
    return res.status(400).json(
      formatResponse({
        message: SUBMISSION_MESSAGES.SUBMISSION_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const updatedSubmission = await Submission.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
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
  const submission = await Submission.findById(id);
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

export {
  triggerSubmission,
  updateSubmission,
  deleteSubmission,
  getSubmission,
  getAllSubmission,
};
