var dichvuModel = require("../models/dichvu.model.js");

var dichvuService = {
    getAll: getAll,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    getById: getById
}

function getAll(objData) {
    return new Promise((resolve, reject) => {
        dichvuModel.getAll(objData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })

}

function addOne(objData) {
    console.log("addOne dichvu");
    return new Promise((resolve, reject) => {
        dichvuModel.addOne(objData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })

}


function updateOne(id, objData, callback) {
    return new Promise((resolve, reject) => {
        dichvuModel.updateOne(id, objData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })

}

function deleteOne(id) {
    return new Promise((resolve, reject) => {
        dichvuModel.deleteOne(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        dichvuModel.getById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = dichvuService
;

