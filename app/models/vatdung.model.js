var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

var vatdungModel = {
    getAll: getAll,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    getById: getById,
    getAllType: getAllType,
    getAllByIdType: getAllByIdType
};

var idModel = "idVD";
var nameModel = "vatdung";

function getAllByIdType(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM " + nameModel + " WHERE " + "idLVD=" + id, (error, rows, fields) => {
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

function getAllType() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM " + "loai_vatdung", (error, rows, fields) => {
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
        db.query("INSERT INTO " + nameModel + "(name, description, idLVD)VALUES("
            + "'" + obj.name + "'"
            + ",'" + obj.description + "'"
            + ",'" + obj.idLVD + "'"
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
    console.log("updateOne: " + JSON.stringify(obj))
    return new Promise((resolve, reject) => {
        db.query("UPDATE " + nameModel + " set "
            + " name='" + obj.name + "'"
            + " ,description='" + obj.description + "'"
            + " ,idLVD='" + obj.idLVD + "'"
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

module.exports = vatdungModel;

