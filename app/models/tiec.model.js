var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

var tiecModel = {
    getAll: getAll,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    getById: getById,
    getAllByIdNN: getAllByIdNN,
    getAllByIdND: getAllByIdND,
    updateStatus: updateStatus,
    ignoreResponsibility: ignoreResponsibility
}

var idModel = "idTiec";
var nameModel = "tiec";
var nameRelaModel1 = "loai_tiec";
var idRelaModel1 = "idLoai";
var idRelaModel2 = "idNN";
var idRelaModel3 = "idND";

function ignoreResponsibility(idTiec) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE tiec SET idNN = " + 0 + " WHERE idTiec = " + idTiec, (error, rows, fields) => {
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

function updateStatus(idTiec, status) {
    console.log("updateStatus: " + idTiec + " status: " + JSON.stringify(status));
    return new Promise((resolve, reject) => {
        db.query("UPDATE tiec SET status = " + status + " WHERE idTiec = " + idTiec, (error, rows, fields) => {
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

function getAllByIdND(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT tiec.idTiec, tiec.address, tiec.phone, tiec.idMenu, tiec.idND, tiec.idLoai, loai_tiec.name " +
            " , tiec.status, tiec.quantity, tiec.start, user.name AS nameNN, tiec.idNN, tiec.idMenu, menu.name AS nameMenu" +
            " FROM " + nameModel +
            " INNER JOIN " + nameRelaModel1 +
            " ON " + nameRelaModel1 + "." + idRelaModel1 + "=" + nameModel + "." + idRelaModel1 +
            " INNER JOIN " + "user" +
            " ON " + "user" + "." + "idU" + "=" + nameModel + "." + "idNN" +
            " INNER JOIN " + "menu" +
            " ON " + "menu" + "." + "idMenu" + "=" + nameModel + "." + "idMenu" +
            " WHERE " + idRelaModel3 + " =" + id, (error, rows, fields) => {
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
        db.query("SELECT * FROM " + nameModel +
            " INNER JOIN " + nameRelaModel1 +
            " ON " + nameRelaModel1 + "." + idRelaModel1 + "=" + nameModel + "." + idRelaModel1, (error, rows, fields) => {
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
        db.query("SELECT * FROM " + nameModel +
            " INNER JOIN " + nameRelaModel1 +
            " ON " + nameRelaModel1 + "." + idRelaModel1 + "=" + nameModel + "." + idRelaModel1 +
            " WHERE " + idModel + " =" + id, (error, rows, fields) => {
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
        db.query("INSERT INTO " + nameModel + "(address, phone, idLoai, idMenu, idND, idNN, quantity, start)VALUES("
            + "'" + obj.address + "'"
            + ",'" + obj.phone + "'"
            + ",'" + obj.idLoai + "'"
            + ",'" + obj.idMenu + "'"
            + ",'" + obj.idND + "'"
            + ",'" + obj.idNN + "'"
            + ",'" + obj.quantity + "'"
            + ",'" + obj.start + "'"
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
            + " name='" + obj.name + "'"
            + " ,salary='" + obj.salary + "'"
            + " ,workTime='" + obj.workTime + "'"
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

module.exports = tiecModel;

