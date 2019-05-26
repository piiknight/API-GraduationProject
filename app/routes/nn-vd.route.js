const nnVdService = require('../services/nn-vd.service');
var schema = require('../schema/nnVdValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');

var url = "nn-vd";
var nameModel = "nn_vd";

function init(router) {
    router.route('/' + url)
        .get(getAll)
        .post(addOne);
    router.route('/' + url + '/:id')
        .get(getById)
        .delete(deleteOne)
        .put(updateOne);
    router.route('/' + url + '/nn' + '/:id')
        .get(getAllByIdNN);
    router.route('/' + url + '/check' + '/:id')
        .get(getCheckQuantityVDByTiec);
}

function getCheckQuantityVDByTiec(req, res) {
    let id = req.params.id;
    nnVdService.getCheckQuantityVDByTiec(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getAllByIdNN(req, res) {
    let id = req.params.id;
    nnVdService.getAllByIdNN(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getAll(req, res) {
    nnVdService.getAll().then((data) => {
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

    nnVdService.addOne(objData).then((data) => {
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

    nnVdService.updateOne(id, objData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}


function deleteOne(req, res) {
    var delId = req.params.id;
    nnVdService.deleteOne(delId).then((data) => {
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

    nnVdService.getById(objId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

module.exports.init = init;



