const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleErrors");
const { matchedData } = require("express-validator");
// Obtener lista de la base de datos
const getItems = async (req, res) => {
  try {
    const data = await tracksModel.findAllData({});
    return res.status(200).send({
      data,
    });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEMS", 500);
  }
};

//obtener un detalle
const getItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const { id } = body;
    const data = await tracksModel.findOneData(id);
    return res.status(200).send({
      data,
    });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM " + e.toString(), 500);
  }
};

//insertar un registro
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);

    const data = await tracksModel.create(body);

    return res.status(201).send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_ITEM" + e.toString(), 500);
  }
};

//actualizar un registro
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);

    const data = await tracksModel.findByIdAndUpdate(id, body);

    return res.status(200).send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEM" + e.toString(), 500);
  }
};

//eliminar un registro
const deleteItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const { id } = body;

    const data = await tracksModel.delete({ _id: id });

    return res.status(200).send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_ITEM" + e.toString(), 500);
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
