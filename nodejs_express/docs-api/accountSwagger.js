/**
 * @swagger
 * tags:
 *   name: Account
 *   description: start account
 */

/**
 * @swagger
 * /account/changePassword:
 *   post:
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The current password of the user.
 *               newPassword:
 *                 type: string
 *                 description: The new password the user wants to set.
 *     responses:
 *       200:
 *         description: Password changed successfully
 */

/**
 * @swagger
 * /account/me:
 *   get:
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 */
