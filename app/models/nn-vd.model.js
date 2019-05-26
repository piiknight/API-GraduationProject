var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

var nnVdModel = {
    getAll: getAll,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    getById: getById,
    getAllByIdNN: getAllByIdNN,
    getCheckQuantityVDByTiec: getCheckQuantityVDByTiec,
    getCheckQuantityVDByMenu: getCheckQuantityVDByMenu
}

var idModel = "idNNVD";
var nameModel = "nn_vd";
var idRelaModel2 = "idNN";
var nameRelaModel1 = "vatdung";
var idRelaModel1 = "idVD";

function getCheckQuantityVDByMenu(tiec) {
    let idMenu = tiec.idMenu;
    let idNN = tiec.idNN;
    let quantity = tiec.quantity;
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM (\n" +
            "SELECT mon_vd.idVD, vatdung.name, vatdung.description, vatdung.idLVD, SUM(mon_vd.quantity) * " + quantity + " AS quantity, SUM(mon_vd.quantity) * " + quantity + " * 1.1 AS sum,nn_vd.maxQuantity, nn_vd.idNN " +
            "FROM mon_vd " +
            "LEFT JOIN nn_vd ON mon_vd.idVD = nn_vd.idVD " +
            "INNER JOIN vatdung ON vatdung.idVD = mon_vd.idVD " +
            "WHERE idMon IN (" +
            "SELECT idMon FROM menu_mon " +
            "WHERE idMenu = " + idMenu + " " +
            ") " +
            "GROUP BY mon_vd.idVD " +
            ") AS mBang " +
            "WHERE mBang.idNN = " + idNN + " OR mBang.idNN IS NULL", (error, rows, fields) => {
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

function getCheckQuantityVDByTiec(obj) {
    console.log("Tiec_Model");
    let idNN = obj.idNN;
    let idTypeVdByTiec = 2;
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM (SELECT vatdung.idVD, vatdung.name, vatdung.description, vatdung.idLVD, vatdung.quantity * 10 AS quantity, vatdung.quantity * 11 AS sum, nn_vd.maxQuantity, nn_vd.idNN " +
            "FROM vatdung " +
            "LEFT JOIN nn_vd ON vatdung.idVD = nn_vd.idVD " +
            "WHERE vatdung.idLVD = " + idTypeVdByTiec + ") AS mBang " +
            "WHERE mBang.idNN = " + idNN + " OR mBang.idNN IS NULL", (error, rows, fields) => {
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

