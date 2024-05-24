/**
 * @swagger
 * tags:
 *   name: gpCompany
 *   description: handle gp company
 */

/**
 * @swagger
 * '/gpCompany':
 *  post:
 *     tags: [gpCompany]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - category
 *              - status
 *            properties:
 *              name:
 *                typing: string
 *              category:
 *                typing: string
 *              status:
 *                typing: string
 *              accountId:
 *                typing: integer
 *     responses:
 *      201:
 *        description: Created
 */

/**
 * @swagger
 * '/gpCompany/{id}':
 *  patch:
 *     tags: [gpCompany]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the gpCompany to update
 *        schema:
 *          type: integer
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - category
 *              - status
 *            properties:
 *              name:
 *                typing: string
 *              category:
 *                typing: string
 *              status:
 *                typing: string
 *     responses:
 *      201:
 *        description: updated
 */

/**
 * @swagger
 * '/gpCompany':
 *  get:
 *     tags: [gpCompany]
 *     responses:
 *      201:
 *        description: updated
 */

/**
 * @swagger
 * '/gpCompany/{id}':
 *  get:
 *     tags: [gpCompany]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the gpCompany to detail
 *        schema:
 *          type: integer
 *     responses:
 *      201:
 *        description: detail
 */

/**
 * @swagger
 * '/gpCompany/status':
 *  get:
 *     tags: [gpCompany]
 *     responses:
 *      201:
 *        description: success
 */
