const { generateToken } = require("../service/token.service");
const { sendSuccess, sendError } = require("../utils/responseHandler");
const User = require("./user.model");
const moment = require("moment");

//register
const userRegistration = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (await User.isEmailTaken(email)) {
      return res.status(400).send({
        message: "Email Already Taken",
      });
    }

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    res.status(200).send({
      message: "User Registered Succesfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: "Registration Failed",
    });
  }
};

//login
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordMatch(password))) {
        return sendError(res, 401, "Incorrect Email or Password");
    }

    const accessTokenExpires = moment().add(
      process.env.JWT_ACCESS_EXPIRATION_MINUTES,
      "minute"
    );

    const accessToken = await generateToken(
      user._id,
      user.role,
      accessTokenExpires,
      "access"
    );

    // 🍪 Save token in cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // prevents JS access (more secure)
      secure: process.env.NODE_ENV === "production", // https only in prod
      sameSite: "strict",
      maxAge: process.env.JWT_ACCESS_EXPIRATION_MINUTES * 60 * 1000, // convert min → ms
    });

    return sendSuccess(res, 200, "Logged in successfully", {
        accessToken,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
          bio: user.bio,
          profession: user.profession,
        },
      });
    } catch (error) {
      return sendError(res, 500, "Internal server error", error);
    }
  };

//logout
const userLogout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

//get All user (by admin)
const getAllUsers = async(req,res) => {

    const response  =  await User.find({},"email role username")
    sendSuccess(res,200,"All user fetched successfully", response)
}

//delete users(by admin)
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    return sendSuccess(res, 200, "User deleted successfully", { user });
  } catch (error) {
    return sendError(res, 500, "Failed to delete user", error);
  }
};


//user update(by admin)
const userUpdate = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    return sendSuccess(res, 200, "User updated successfully", { user });
  } catch (error) {
    return sendError(res, 500, "Failed to update user", error);
  }
};


module.exports = {
  userRegistration,
  userLogin,
  userLogout,
  getAllUsers,
  deleteUser,
  userUpdate

};
