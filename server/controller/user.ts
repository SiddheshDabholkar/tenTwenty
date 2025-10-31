import { Request, Response } from "express";
import { formatResponse } from "../utils/common";
import { USER_MESSAGES } from "../constant/message";
import { User } from "../models/User";

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json(
      formatResponse({
        message: USER_MESSAGES.USER_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const userInfo = await User.findById(id);
  if (!userInfo) {
    return res.status(400).json(
      formatResponse({
        message: USER_MESSAGES.USER_NOT_FOUND,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: USER_MESSAGES.USER_FETCH_SUCCESS,
      data: userInfo,
      success: true,
    })
  );
};

const getAllUsers = async (req: Request, res: Response) => {
  const { skip = 0, limit = 10, search } = req.query;
  const payload = {
    ...(search
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
          ],
        }
      : {}),
  };
  const users = await User.find(payload).skip(+skip).limit(+limit);
  return res.status(200).json(
    formatResponse({
      message: USER_MESSAGES.USER_FETCH_SUCCESS,
      data: users,
      success: true,
    })
  );
};

const updateUserRole = async (req: Request, res: Response) => {
  const { _id, role } = req.body;
  if (!_id) {
    return res.status(400).json(
      formatResponse({
        message: USER_MESSAGES.USER_ID_REQUIRED,
        data: null,
        success: false,
      })
    );
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { role },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(400).json(
      formatResponse({
        message: USER_MESSAGES.USER_UPDATE_FAILED,
        data: null,
        success: false,
      })
    );
  }
  return res.status(200).json(
    formatResponse({
      message: USER_MESSAGES.USER_UPDATE_SUCCESS,
      data: updatedUser,
      success: true,
    })
  );
};

export { getUser, getAllUsers, updateUserRole };
