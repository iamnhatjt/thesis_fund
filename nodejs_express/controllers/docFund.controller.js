const driverConfig = require("../config/configDriver");
const responseApi = require("../config/responseApi");
const db = require("../db/models");
const { isOwnerGP, isOwnerFund } = require("../utils/checkRole");
const fs = require("fs");

const getAllDocs = async (req, res) => {
  try {
    const fundId = req.params.fundId;
    const dbDoc = await db.docFund.findAll({
      where: {
        FundId: fundId,
      },
    });

    res.json(
      responseApi.success({
        data: dbDoc,
      })
    );
  } catch (err) {
    res.status(500).json(responseApi.error({ message: err.message }));
  }
};

const createDoc = async (req, res) => {
  try {
    const { description, fileName } = req.body;
    const fundId = req.params?.fundId;
    const isOwner = await isOwnerFund(fundId, req?.userInfo?.id);

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
        db.docFund
          .create({
            doc: file.data.id,
            description,
            FundId: fundId,
            fileName: fileName ?? fileInfo?.originalname,
          })
          .then((doc) => {
            res.json(
              responseApi.success({
                data: doc,
              })
            );
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    );
  } catch (err) {
    res.status(500).json(responseApi.error({ message: err.message }));
  }
};
const docFile = async (req, res) => {
  try {
    const docId = req.params.docId;
    const doc = await db.docFund.findByPk(docId);
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
          })
        );
      }
    );
  } catch (err) {
    res.status(500).json(responseApi.error({ message: err.message }));
  }
};
const updateDoc = async (req, res) => {
  try {
    const userId = req?.userInfo?.id;
    const docDb = await db.docFund.findByPk(req.params.docId);
    const isOwner = await isOwnerFund(docDb.FundId, userId);

    if (!isOwner) {
      throw new Error("should be owner of gp to do this...");
    }
    await docDb.update(req.body);
    res.json(
      responseApi.success({
        data: docDb,
      })
    );
  } catch (err) {
    res.status(500).json(responseApi.error({ message: err.message }));
  }
};

const deleteDoc = async (req, res) => {
  try {
    const userId = req?.userInfo?.docId;
    const docDb = await db.fundDoc.findByPk(req.params.docId);
    const driver = await driverConfig();

    const isOwner = await isOwnerFund(docDb.FundId, userId);
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

const docFundController = {
  getAllDocs,
  createDoc,
  docFile,
  updateDoc,
  deleteDoc,
};

module.exports = docFundController;
