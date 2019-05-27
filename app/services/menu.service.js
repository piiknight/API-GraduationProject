var model = require("../models/menu.model.js");
var modelRela = require("../models/menu-mon.model.js");

var menuService = {
    getAll: getAll,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    getById: getById,
    getTotalPrice: getTotalPrice
}

function getTotalPrice(id) {
    return new Promise((resolve, reject) => {
        model.getTotalPrice(id).then((data) => {
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
            console.log("addOne: " + JSON.stringify(data));
            objData.idMenu = data.insertId;
            modelRela.addByIdRela(objData).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        }).catch((err) => {
            reject(err);
        });
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
            return new Promise((resolve, reject) => {
                modelRela.deleteAllByIdMenu(id).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                })
            })
        }).catch((err) => {
            reject(err);
        })
    });
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

module.exports = menuService
;

