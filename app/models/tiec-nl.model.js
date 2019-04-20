var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

var tiecNLModel = {
    getAll: getAll,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    getById: getById,
    getAllByIdTiec: getAllByIdTiec
}

var idModel = "idTNL";
var idRelaModel = "idTiec";
var nameModel = "tiec_nl";

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
        db.query("INSERT INTO " + nameModel + "(idTiec, idNL, idCV)VALUES("
            + "'" + obj.idTiec + "'"
            + ",'" + obj.idNL + "'"
            + ",'" + obj.idCV + "'"
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
            + " idTiec='" + obj.idTiec + "'"
            + " ,idNL='" + obj.idNL + "'"
            + " ,idCV='" + obj.idCV + "'"
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

function getAllByIdTiec(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM " + nameModel + " WHERE " + idRelaModel + " = " + id.id, (error, rows, fields) => {
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

module.exports = tiecNLModel;

