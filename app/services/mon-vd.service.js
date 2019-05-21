var model = require("../models/mon-vd.model.js");

var monVdService = {
    getAll: getAll,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    getById: getById,
    getAllByIdMon: getAllByIdMon
}

function getAllByIdMon(id) {
    return new Promise((resolve, reject) => {
        model.getAllByIdMon(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getAll(objData) {
    return new Promise((resolve, reject) => {
        model.getAll(objData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function addOne(objData) {
    return new Promise((resolve, reject) => {
        model.addOne(objData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })

}


function updateOne(id, objData, callback) {
    return new Promise((resolve, reject) => {
        model.updateOne(id, objData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })

}

function deleteOne(id) {
    return new Promise((resolve, reject) => {
        model.deleteOne(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        model.getById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = monVdService
;

