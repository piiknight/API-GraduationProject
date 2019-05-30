const tiecService = require('../services/tiec.service');
var schema = require('../schema/tiecValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');

var url = "tiec";
var nameModel = "tiec";
var urlRela1 = "nn";

function init(router) {
    router.route('/' + url)
        .get(getAll)
        .post(addOne);
    router.route('/' + url + '/:id')
        .get(getById)
        .delete(deleteOne)
        .put(updateOne);
    router.route('/' + url + '/' + urlRela1 + '/:id')
        .get(getAllByIdNN);
    router.route('/' + url + '/' + 'status' + '/:id')
        .put(updateStatus);
    router.route('/' + url + '/' + 'ignore' + '/:id')
        .put(ignoreResponsibility);
}

function ignoreResponsibility(req, res) {
    var id = req.params.id;

    tiecService.ignoreResponsibility(id).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function updateStatus(req, res) {
    var tiec = req.body;
    var id = req.params.id;

    tiecService.updateStatus(id, tiec.status).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function getAllByIdNN(req, res) {

    let id = req.params.id;

    tiecService.getAllByIdNN(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getAll(req, res) {
    tiecService.getAll().then((data) => {
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

    tiecService.addOne(objData).then((data) => {
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

    tiecService.updateOne(id, objData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}


function deleteOne(req, res) {
    var delId = req.params.id;
    tiecService.deleteOne(delId).then((data) => {
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

    tiecService.getById(objId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

module.exports.init = init;



