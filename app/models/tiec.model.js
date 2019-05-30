var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

var tiecModel = {
    getAll: getAll,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    getById: getById,
    getAllByIdNN: getAllByIdNN,
    updateStatus: updateStatus,
    ignoreResponsibility: ignoreResponsibility
}

var idModel = "idTiec";
var nameModel = "tiec";
var nameRelaModel1 = "loai_tiec";
var idRelaModel1 = "idLoai";
var idRelaModel2 = "idNN";

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
        db.query("INSERT INTO " + nameModel + "(name, salary, workTime)VALUES("
            + "'" + obj.name + "'"
            + ",'" + obj.salary + "'"
            + ",'" + obj.workTime + "'"
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

