var tiecModel = require("../models/tiec.model.js");

var tiecService = {
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

function ignoreResponsibility(idTiec) {
    return new Promise((resolve, reject) => {
        tiecModel.ignoreResponsibility(idTiec).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function updateStatus(idTiec, status) {
    return new Promise((resolve, reject) => {
        tiecModel.updateStatus(idTiec, status).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getAllByIdND(id) {
    return new Promise((resolve, reject) => {
        tiecModel.getAllByIdND(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getAllByIdNN(id) {
    return new Promise((resolve, reject) => {
        tiecModel.getAllByIdNN(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getAll(objData) {
    return new Promise((resolve, reject) => {
        tiecModel.getAll(objData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function addOne(objData) {
    return new Promise((resolve, reject) => {
        tiecModel.addOne(objData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })

}


function updateOne(id, objData, callback) {
    return new Promise((resolve, reject) => {
        tiecModel.updateOne(id, objData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })

}

function deleteOne(id) {
    return new Promise((resolve, reject) => {
        tiecModel.deleteOne(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        tiecModel.getById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = tiecService
;

