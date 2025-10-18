const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../../controllers/authController");
const { body } = require("express-validator"); 
const validateRequest = require("../../middleware/validationMiddleware");
const auth = require("../../middleware/authMiddleware");
const { admin } = require("../../firebase/firebaseAdmin");

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 uid:
 *                   type: string
 *       400:
 *         description: Missing required fields / Invalid input
 */
router.post("/register", [
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ],
  validateRequest,
  registerUser
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user and return Firebase token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid credentials / Missing fields
 */
router.post("/login", [
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password").notEmpty().withMessage("Password is required")
  ],
  validateRequest,
  loginUser
);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout the user (revoke Firebase refresh tokens)
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */

router.post("/logout", auth, async (req, res) => {
  try {
    await admin.auth().revokeRefreshTokens(req.user.uid);
    res.status(200).json({ message: "Logout successful, token revoked" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Failed to logout", error: err.message });
  }
});

module.exports = router;
