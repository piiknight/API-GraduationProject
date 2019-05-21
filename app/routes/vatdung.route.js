const service = require('../services/vatdung.service');
var schema = require('../schema/vatdungValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');

var url = "vatdung";
var nameModel = "vatdung";

function init(router) {
    router.route('/' + url)
        .get(getAll)
        .post(addOne);
    router.route('/' + url + "/type")
        .get(getAllType);
    router.route('/' + url + "/type/:id")
        .get(getAllByIdType);
    router.route('/' + url + '/:id')
        .get(getById)
        .delete(deleteOne)
        .put(updateOne);
}

function getAllByIdType(req, res) {
    var id = req.params.id;
    service.getAllByIdType(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getAllType(req, res) {
    service.getAllType().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getAll(req, res) {
    service.getAll().then((data) => {
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

    service.addOne(objData).then((data) => {
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

    service.updateOne(id, objData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}


function deleteOne(req, res) {
    var delId = req.params.id;
    service.deleteOne(delId).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function getById(req, res) {
    console.log("getById");

    let objId = req.params;

    var json_format = iValidator.json_schema(schema.getSchema, objId, nameModel);
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }

    service.getById(objId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

module.exports.init = init;



