var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

var menuModel = {
    getAll: getAll,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    getById: getById,
    getAllByIdMenu: getAllByIdMenu,
    deleteAllByIdMenu: deleteAllByIdMenu,
    addByIdRela: addByIdRela
}

var idModel = "idMM";
var nameModel = "menu_mon";
var idRelaModel1 = "idMenu";

var nameRelaModel2 = "mon";
var idRelaModel2 = "idMon";

function deleteAllByIdMenu(id) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM " + nameModel + " WHERE " + idRelaModel1 + "='" + id + "'", (error, rows, fields) => {
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

function getAllByIdMenu(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM " + nameModel +
            " INNER JOIN " + nameRelaModel2 +
            " ON " + nameRelaModel2 + "." + idRelaModel2 + "=" + nameModel + "." + idRelaModel2 +
            " WHERE " + idRelaModel1 + " =" + id, (error, rows, fields) => {
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

function addByIdRela(obj) {
    console.log("addByIdRela: " + JSON.stringify(obj));
    let idRela = obj[idRelaModel1];
    let values = "";
    for (let i = 0; i < obj["mon"].length; i++) {
        values += i === 0 ? "" : ",";
        values += "("
                + "'" + idRela + "'"
                + ",'" + obj["mon"][i] + "'"
                + ")";
    }

    console.log("values: " + values);

    return new Promise((resolve, reject) => {
        db.query("INSERT INTO " + nameModel + "(idMenu, idMon)VALUES"
            + values, (error, rows, fields) => {
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

function addOne(obj) {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO " + nameModel + "(idMenu, idMon)VALUES("
            + "'" + obj.idMenu + "'"
            + ",'" + obj.idMon + "'"
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
            + " idMenu='" + obj.idMenu + "'"
            + " ,idMon='" + obj.idMon + "'"
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

module.exports = menuModel;

