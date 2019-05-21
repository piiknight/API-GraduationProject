var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

var monVdModel = {
    getAll: getAll,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    getById: getById,
    getAllByIdMon: getAllByIdMon
}

var idModel = "idMVD";
var nameModel = "mon_vd";
var idModelRela = "idMon";

function getAllByIdMon(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM " + nameModel + " WHERE " + idModelRela + "=" + id, (error, rows, fields) => {
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
        db.query("INSERT INTO " + nameModel + "(idMon, idVD, quantity)VALUES("
            + "'" + obj.idMon + "'"
            + ",'" + obj.idVD + "'"
            + ",'" + obj.quantity + "'"
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
    console.log("updateOne: " + JSON.stringify(obj));
    return new Promise((resolve, reject) => {
        db.query("UPDATE " + nameModel + " set "
            + " idMon='" + obj.idMon + "'"
            + " ,idVD='" + obj.idVD + "'"
            + " ,quantity='" + obj.quantity + "'"
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

module.exports = monVdModel;

