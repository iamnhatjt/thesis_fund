/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: start account
 */

/**
 * @swagger
 * '/auth/signIn':
 *  post:
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: admin@gmail.com
 *              password:
 *                type: string
 *                default: admin
 *     responses:
 *      201:
 *        description: Created
 */

/**
 * @swagger
 * '/auth/signUp':
 *  post:
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              Address:
 *                type: string
 *              education:
 *                type: string
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *     responses:
 *      201:
 *        description: Created
 */

/**
 * @swagger
 * /auth/forgotPassword:
 *   post:
 *     summary: Send a password reset email
 *     description: Sends a password reset email to the user.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *     responses:
 *       200:
 *         description: Email sent successfully
 */

/**
 * @swagger
 * /auth/resetPassword/{token}:
 *   post:
 *     summary: Reset the user's password
 *     description: Allows a user to reset their password using a token.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The token provided to the user for resetting the password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the user.
 *     responses:
 *       200:
 *         description: Password reset successful
 */
