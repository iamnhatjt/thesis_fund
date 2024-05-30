const responseApi = require("../config/responseApi");
const fs = require("fs");
const db = require("../db/models");
const { isOwnerGP } = require("../utils/checkRole");
const driverConfig = require("../config/configDriver");

const getAllDocs = async (req, res) => {
  try {
    const gpId = req.params.gpId;
    const dbDoc = await db.DocGP.findAll({
      where: {
        GpCompanyId: gpId,
      },
    });

    res.json(
      responseApi.success({
        data: dbDoc,
      }),
    );
  } catch (err) {
    res.status(500).json(responseApi.error({ message: err.message }));
  }
};

const createDoc = async (req, res) => {
  try {
    const { description, fileName } = req.body;
    const gpId = req.params?.gpId;
    const isOwner = await isOwnerGP(req?.userInfo?.id, gpId);

    if (!isOwner) {
      throw new Error("should be owner of gp to do this...");
    }

    const fileInfo = req.file;
    const driver = await driverConfig();
    const pdfFile = fs.createReadStream(fileInfo?.path);

    const fileMetaData = {
      name: fileInfo?.originalname,
      parents: [process.env.ID_FOLDER_THESIS_DIVER],
    };

    driver.files.create(
      {
        resource: fileMetaData,
        media: {
          mimeType: fileInfo?.mimetype,
          body: pdfFile,
        },
        fields: "id",
      },
      function (error, file) {
        if (error) {
          throw new Error(error);
        }
        db.DocGP.create({
          doc: file.data.id,
          description,
          GpCompanyId: gpId,
          fileName: fileName ?? fileInfo?.originalname,
        })
          .then((doc) => {
            res.json(
              responseApi.success({
                data: doc,
              }),
            );
          })
          .catch((err) => {
            throw new Error(err);
          });
      },
    );
  } catch (err) {
    res.status(500).json(responseApi.error({ message: err.message }));
  }
};

const docFile = async (req, res) => {
  try {
    const docId = req.params.docId;
    const doc = await db.DocGP.findByPk(docId);
    const driver = await driverConfig();

    driver.files.get(
      {
        fileId: doc?.doc,
        alt: "media",
      },
      (error, file) => {
        if (error) {
          throw new Error(error);
        }
        console.log(file);
        res.json(
          responseApi.success({
            data: file,
          }),
        );
      },
    );
  } catch (err) {
    res.status(500).json(responseApi.error({ message: err.message }));
  }
};

const updateDoc = async (req, res) => {
  try {
    const userId = req?.userInfo?.id;
    const docDb = await db.DocGP.findByPk(req.params.docId);
    const isOwner = await isOwnerGP(userId, docDb.GpCompanyId);
    if (!isOwner) {
      throw new Error("should be owner of gp to do this...");
    }
    await docDb.update(req.body);
    res.json(
      responseApi.success({
        data: docDb,
      }),
    );
  } catch (err) {
    res.status(500).json(responseApi.error({ message: err.message }));
  }
};

const deleteDoc = async (req, res) => {
  try {
    const userId = req?.userInfo?.docId;
    const docDb = await db.DocGP.findByPk(req.params.docId);
    const driver = await driverConfig();

    const isOwner = await isOwnerGP(userId, docDb.GpCompanyId);
    if (!isOwner) {
      throw new Error("should be owner of gp to do this...");
    }
    driver.files.delete({
      fileId: docDb.doc,
    });
    await docDb.destroy();
    res.json(responseApi.success({}));
  } catch (err) {
    res.status(500).json(responseApi.error({ message: err.message }));
  }
};

const docController = {
  getAllDocs,
  createDoc,
  docFile,
  updateDoc,
  deleteDoc,
};

module.exports = docController;
