const loaiTiecService = require('../services/loai-tiec.service');
var schema = require('../schema/loaiTiecValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');

var url = "loai-tiec";
var nameModel = "loai-tiec";

function init(router) {
    router.route('/' + url)
        .get(getAll)
        .post(addOne);
    router.route('/' + url + '/:id')
        .get(getById)
        .delete(deleteOne)
        .put(updateOne);
}

function getAll(req, res) {
    loaiTiecService.getAll().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function addOne(req, res) {
    var objData = req.body;

    //Validating the input entity
    var json_format = iValidator.json_schema(schema.postSchema, objData, nameModel);
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }

    loaiTiecService.addOne(objData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

}

function updateOne(req, res) {
    var objData = req.body;
    var id = req.params.id;

    //Validating the input entity
    var json_format = iValidator.json_schema(schema.postSchema, objData, nameModel);
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }

    loaiTiecService.updateOne(id, objData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}


function deleteOne(req, res) {
    var delId = req.params.id;
    loaiTiecService.deleteOne(delId).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function getById(req, res) {

    let objId = req.params;

    var json_format = iValidator.json_schema(schema.getSchema, objId, nameModel);
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }

    loaiTiecService.getById(objId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

module.exports.init = init;



