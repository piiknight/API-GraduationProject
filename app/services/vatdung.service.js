var model = require("../models/vatdung.model.js");

var vatdungService = {
    getAll: getAll,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    getById: getById,
    getAllType: getAllType,
    getAllByIdType: getAllByIdType
}

function getAllByIdType(id) {
    return new Promise((resolve, reject) => {
        model.getAllByIdType(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getAllType() {
    return new Promise((resolve, reject) => {
        model.getAllType().then((data) => {
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

module.exports = vatdungService
;

