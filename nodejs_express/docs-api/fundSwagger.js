/**
 * @swagger
 * tags:
 *   name: fund
 *   description: handle fund
 */

/**
 * @swagger
 * '/fund':
 *  get:
 *     tags: [fund]
 *     parameters:
 *      - in: path
 *        name: searchText
 *        description: Numeric ID of the fund to get
 *        schema:
 *          type: string
 *     responses:
 *      201:
 *        description: updated
 */

/**
 * @swagger
 * '/fund/{id}':
 *  get:
 *     tags: [fund]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the fund to get
 *        schema:
 *          type: integer
 *     responses:
 *      201:
 *        description: updated
 */

/**
 * @swagger
 * '/fund/moneyFund/{id}':
 *   post:
 *     tags:
 *       - fund
 *     summary: Add money to fund
 *     description: Add money to fund
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the fund
 *
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - accountEmail
 *              - description
 *              - status
 *              - money
 *              - status
 *            properties:
 *              accountEmail:
 *                type: string
 *              description:
 *                type: string
 *              status:
 *                type: string
 *                default: extract
 *              money:
 *                type: integer
 *
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * '/fund':
 *  post:
 *     tags: [fund]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - lastName
 *              - status
 *              - invested
 *              - percentUsed
 *            properties:
 *              name:
 *                type: string
 *              lastName:
 *                type: string
 *              status:
 *                type: string
 *              invested:
 *                type: integer
 *              percentUsed:
 *                type: integer
 *              accountId:
 *                type: integer
 *     responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * '/fund/{id}':
 *  patch:
 *     tags: [fund]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the fund to update
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
 *              - lastName
 *              - status
 *              - invested
 *              - percentUsed
 *            properties:
 *              name:
 *                type: string
 *              lastName:
 *                type: string
 *              status:
 *                type: string
 *              invested:
 *                type: integer
 *              percentUsed:
 *                type: integer
 *     responses:
 *      201:
 *        description: updated
 */

/**
 * @swagger
 * '/fund/historyFund/{id}':
 *   get:
 *     tags:
 *       - fund
 *     summary: list history fund
 *     description: Add money to fund
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the fund
 *
 *     responses:
 *       '200':
 *         description: OK
 */
