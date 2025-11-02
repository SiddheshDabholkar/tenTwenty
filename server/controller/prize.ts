import type { Request, Response } from "express";
import { formatResponse } from "../utils/common";
import { PRIZE_MESSAGES } from "../constant/message";
import { Prize } from "../models/Prize";
import { validatePrizePayload } from "../utils/validation";

const createPrize = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const userId = req?.user?._id;

  const validatedError = validatePrizePayload({
    title,
    description,
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

  const newPrize = await Prize.create({
    title,
    description,
    createdBy: userId,
    updatedBy: userId,
  });
  if (!newPrize) {
    return res.status(400).json(
      formatResponse({
        message: PRIZE_MESSAGES.PRIZE_CREATION_SUCCESS,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: PRIZE_MESSAGES.PRIZE_CREATION_FAILED,
      data: newPrize,
      success: true,
    })
  );
};

const updatePrize = async (req: Request, res: Response) => {
  const { _id, title, description } = req.body;
  if (!_id) {
    return res.status(400).json(
      formatResponse({
        message: PRIZE_MESSAGES.PRIZE_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const validatedError = validatePrizePayload({
    title,
    description,
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
  const updatedPrize = await Prize.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!updatedPrize) {
    return res.status(400).json(
      formatResponse({
        message: PRIZE_MESSAGES.PRIZE_FETCH_FAILED,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: PRIZE_MESSAGES.PRIZE_UPDATE_SUCCESS,
      data: updatedPrize,
      success: true,
    })
  );
};

const deletePrize = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json(
      formatResponse({
        message: PRIZE_MESSAGES.PRIZE_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const deletedPrize = await Prize.findByIdAndDelete(id);
  if (!deletedPrize) {
    return res.status(400).json(
      formatResponse({
        message: PRIZE_MESSAGES.PRIZE_DELETE_SUCCESS,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: PRIZE_MESSAGES.PRIZE_DELETE_SUCCESS,
      data: deletedPrize,
      success: true,
    })
  );
};

const getPrize = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json(
      formatResponse({
        message: PRIZE_MESSAGES.PRIZE_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const prize = await Prize.findById(id);
  if (!prize) {
    return res.status(400).json(
      formatResponse({
        message: PRIZE_MESSAGES.PRIZE_NOT_FOUND,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: PRIZE_MESSAGES.PRIZE_FETCH_SUCCESS,
      data: prize,
      success: true,
    })
  );
};

const getAllPrizes = async (req: Request, res: Response) => {
  const { skip = 0, limit = 10, search = "" } = req.query;
  const payload = {
    ...(search
      ? {
          question: { $regex: search, $options: "i" },
        }
      : {}),
  };
  const prizes = await Prize.find(payload).skip(+skip).limit(+limit);
  return res.status(200).json(
    formatResponse({
      message: PRIZE_MESSAGES.PRIZE_FETCH_SUCCESS,
      data: prizes,
      success: true,
    })
  );
};

export { createPrize, updatePrize, deletePrize, getPrize, getAllPrizes };
