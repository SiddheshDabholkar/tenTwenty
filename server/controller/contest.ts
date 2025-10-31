import { validateCreateContestPayload } from "../utils/validation";
import { formatResponse } from "../utils/common";
import { Contest } from "../models/Contest";
import { CONTEST_MESSAGES } from "../constant/message";
import { Request, Response } from "express";
import { handleContestEnd } from "../services/contestScheduler";

const createContest = async (req: Request, res: Response) => {
  const {
    name,
    description,
    startDateTime,
    endDateTime,
    questions,
    role,
    prizeId,
  } = req.body;
  const validatedError = validateCreateContestPayload({
    name,
    description,
    startDateTime,
    endDateTime,
    questions,
    role,
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
  const createdContest = await Contest.create({
    name,
    description,
    startDateTime,
    endDateTime,
    questions,
    role,
    prizeId,
  });
  if (!createdContest) {
    return res.status(400).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_CREATION_FAILED,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: CONTEST_MESSAGES.CONTEST_CREATION_SUCCESS,
      data: createdContest,
      success: true,
    })
  );
};

const getContest = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const contest = await Contest.findById(id);
  if (!contest) {
    return res.status(400).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_NOT_FOUND,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: CONTEST_MESSAGES.CONTEST_FETCH_SUCCESS,
      data: contest,
      success: true,
    })
  );
};

const getAllContest = async (req: Request, res: Response) => {
  const { skip = 0, limit = 10, search = "", role } = req.query;
  const payload = {
    role,
    ...(search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {}),
  };
  const contests = await Contest.find(payload).skip(+skip).limit(+limit);
  return res.status(200).json(
    formatResponse({
      message: CONTEST_MESSAGES.CONTEST_FETCH_SUCCESS,
      data: contests,
      success: true,
    })
  );
};

const updateContest = async (req: Request, res: Response) => {
  const { _id } = req.body;
  if (!_id) {
    return res.status(400).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const updatedContest = await Contest.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!updatedContest) {
    return res.status(400).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_UPDATE_FAILED,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: CONTEST_MESSAGES.CONTEST_UPDATE_SUCCESS,
      data: updatedContest,
      success: true,
    })
  );
};

const deleteContest = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const deletedContest = await Contest.findByIdAndDelete(id);
  if (!deletedContest) {
    return res.status(400).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_DELETE_FAILED,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: CONTEST_MESSAGES.CONTEST_DELETE_SUCCESS,
      data: deletedContest,
      success: true,
    })
  );
};

const processContestEnd = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }

  try {
    await handleContestEnd(id);
    return res.status(200).json(
      formatResponse({
        message: "Contest end processed successfully",
        data: null,
        success: true,
      })
    );
  } catch (error) {
    return res.status(500).json(
      formatResponse({
        message: "Failed to process contest end",
        data: null,
        success: false,
      })
    );
  }
};

export {
  createContest,
  getContest,
  getAllContest,
  updateContest,
  deleteContest,
  processContestEnd,
};
