/**
 * @swagger
 * tags:
 *   name: DocGP
 *   description: handle pdf
 */

/**
 * @swagger
 * /doc/{gpId}:
 *   get:
 *     tags: [DocGP]
 *     parameters:
 *       - in: path
 *         name: gpId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the GP.
 *     responses:
 *       200:
 *         description: A list of documents associated with the specified GP ID.
 */

/**
 * @swagger
 * /doc/{gpId}:
 *   post:
 *     tags: [DocGP]
 *     summary: Upload a file
 *     parameters:
 *       - in: path
 *         name: gpId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the GP.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 */

/**
 * @swagger
 * /doc/data/{docId}:
 *   get:
 *     tags: [DocGP]
 *     summary: Retrieve a specific document by its ID
 *     description: This endpoint allows you to fetch a document identified by its ID from the database and then retrieve its corresponding file from Google Drive.
 *     parameters:
 *       - in: path
 *         name: docId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the document to retrieve.
 *     responses:
 *       200:
 *         description: A successful operation. Returns the document and its corresponding file from Google Drive.
 */
