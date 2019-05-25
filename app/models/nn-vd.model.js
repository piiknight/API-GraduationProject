var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

var nnVdModel = {
    getAll: getAll,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    getById: getById,
    getAllByIdNN: getAllByIdNN,
}

var idModel = "idNNVD";
var nameModel = "nn_vd";
var idRelaModel2 = "idNN";
var nameRelaModel1 = "vatdung";
var idRelaModel1 = "idVD";

function getAllByIdNN(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM " + nameModel +
            " INNER JOIN " + nameRelaModel1 +
            " ON " + nameRelaModel1 + "." + idRelaModel1 + "=" + nameModel + "." + idRelaModel1 +
            " WHERE " + idRelaModel2 + " =" + id, (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function getAll() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM " + nameModel, (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function getById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM " + nameModel + " WHERE " + idModel + " =" + id.id, (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function addOne(obj) {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO " + nameModel + "(idNN, idVD, maxQuantity, curQuantity)VALUES("
            + "'" + obj.idNN + "'"
            + ",'" + obj.idVD + "'"
            + ",'" + obj.maxQuantity + "'"
            + ",'" + obj.curQuantity + "'"
            + ")", (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}


function updateOne(id, obj) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE " + nameModel + " set "
            + " idNN='" + obj.idNN + "'"
            + " ,idVD='" + obj.idVD + "'"
            + " ,maxQuantity='" + obj.maxQuantity + "'"
            + " ,curQuantity='" + obj.curQuantity + "'"
            + " WHERE " + idModel + "='" + id + "'", (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    })
}

function deleteOne(id) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM " + nameModel + " WHERE " + idModel + "='" + id + "'", (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

module.exports = nnVdModel;

