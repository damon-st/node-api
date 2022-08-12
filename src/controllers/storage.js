const { storageModel } = require("../models");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
const { handleHttpError } = require("../utils/handleErrors");
const { matchedData } = require("express-validator");
const fs = require("fs");

// Obtener lista de la base de datos
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    return res.status(200).send({
      data,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS" + error.toString(), 500);
    return;
  }
};

//obtener un detalle
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    return res.status(200).send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM" + error.toString(), 500);
    return;
  }
};

//insertar un registro
const createItem = async (req, res) => {
  try {
    const { body, file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);

    return res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM" + error.toString(), 500);
    return;
  }
};

//eliminar un registro
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    if (data != null) {
      await storageModel.deleteOne({ _id: id });
      const { filename } = data;
      const filePath = `${MEDIA_PATH}/${filename}`;
      fs.unlinkSync(filePath);
      return res.status(200).send({ message: "success" });
    } else {
      return res.status(404).send({ message: "File no found" });
    }
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM" + error.toString(), 500);
    return;
  }
};

module.exports = { getItems, getItem, createItem, deleteItem };
