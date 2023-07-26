const express = require("express");
const {
  registerUser,
  LoginUser,
  LogoutUser,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userControllers.js");
const isAuthenticatedUser = require("../middleware/auth.js");
const authorizeRoles = require("../middleware/authRoles.js");
const uploadMiddleware = require("../middleware/multer.js");
const ErrorHandler = require("../utils/errorhandler.js");
const User = require("../models/userModel.js");
const fileUpload = require("express-fileupload");

const router = express.Router();

router.route("/register").post(uploadMiddleware.single("avatar"), registerUser);
router.route("/login").post(LoginUser);
router.route("/logout").get(isAuthenticatedUser, LogoutUser);

router.route("/password/forgot").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router
  .route("/me/update")
  .put(isAuthenticatedUser, uploadMiddleware.single("avatar"), updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
