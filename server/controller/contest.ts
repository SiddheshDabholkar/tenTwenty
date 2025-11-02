import { validateCreateContestPayload } from "../utils/validation";
import { formatResponse } from "../utils/common";
import { Contest } from "../models/Contest";
import { CONTEST_MESSAGES } from "../constant/message";
import { Request, Response } from "express";
import { handleContestEnd } from "../utils/contestScheduler";
import { USER_ROLE } from "../constant/enums";

const createContest = async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const {
    name,
    description,
    startDateTime,
    endDateTime,
    questions,
    role,
    prize,
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
    allowedRoles: role,
    prizeId: prize,
    createdBy: userId,
    updatedBy: userId,
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
  const contest = await Contest.findById(id)
    .populate("prizeId")
    .populate({
      path: "questions",
      populate: {
        path: "options",
      },
    });
  if (!contest) {
    return res.status(400).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_NOT_FOUND,
        data: null,
        success: false,
      })
    );
  }

  const nowUTC = new Date();
  const contestStartUTC = new Date(contest.startDateTime);
  const contestEndUTC = new Date(contest.endDateTime);

  if (nowUTC < contestStartUTC) {
    return res.status(200).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_NOT_STARTED,
        data: contest,
        success: true,
      })
    );
  }

  if (nowUTC >= contestEndUTC) {
    return res.status(200).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_ENDED,
        data: contest,
        success: true,
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
  const { skip = 0, limit = 10, search = "" } = req.query;
  const payload = {
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

const getUserContests = async (req: Request, res: Response) => {
  const { skip = 0, limit = 10, search = "" } = req.query;
  const user = req.user;
  const role = user?.role;
  const isNormal = role === USER_ROLE.NORMAL;

  let payload = {
    ...(isNormal
      ? {
          allowedRoles: { $in: [role] },
        }
      : {}),
    ...(search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {}),
  };
  console.log({
    payload,
    role,
  });
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
  const {
    _id,
    name,
    description,
    startDateTime,
    endDateTime,
    questions,
    role,
    prize,
  } = req.body;
  const userId = req?.user?._id;
  if (!_id) {
    return res.status(400).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
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
  const contest = await Contest.findById(_id);
  if (!contest) {
    return res.status(400).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_NOT_FOUND,
        data: null,
        success: false,
      })
    );
  }
  if (contest.wonBy) {
    return res.status(400).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_ALREADY_ENDED,
        data: null,
        success: false,
      })
    );
  }
  if (contest.startDateTime < new Date()) {
    return res.status(400).json(
      formatResponse({
        message: CONTEST_MESSAGES.CONTEST_ALREADY_STARTED,
        data: null,
        success: false,
      })
    );
  }
  const updatedContest = await Contest.findByIdAndUpdate(
    _id,
    {
      ...req.body,
      name,
      description,
      startDateTime,
      endDateTime,
      questions,
      allowedRoles: role,
      prizeId: prize,
      updatedBy: userId,
    },
    {
      new: true,
    }
  );
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
  getUserContests,
};
