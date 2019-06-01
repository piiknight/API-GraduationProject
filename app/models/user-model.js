var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
const bcrypt = require('bcrypt');

var userModel = {
    getAllUser: getAllUser,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUserById: getUserById,
    updateProfile: updateProfile,
    getUserByMode: getUserByMode
}

function getUserByMode(mode) {
    let typeMode = mode.mode;
    return new Promise((resolve, reject) => {
        db.query("SELECT user.idU, user.name, user.username, user.phone, user.point FROM user " +
            "INNER JOIN permission ON user.idMode = permission.idMode " +
            "WHERE mode = '" + typeMode + "'", (error, rows, fields) => {
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

function getAllUser() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM user" +
            " INNER JOIN permission ON user.idMode = permission.idMode "
            , (error, rows, fields) => {
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

function getUserById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM user WHERE idU =" + id.id, (error, rows, fields) => {
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

function addUser(user) {
    console.log("addUser model: " + JSON.stringify(user));
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                db.query("INSERT INTO user(username, password, idMode, name, point, phone, email, address)VALUES("
                    + "'" + user.username + "'"
                    + ",'" + user.password + "'"
                    + ",'" + user.idMode + "'"
                    + ",'" + user.name + "'"
                    + ",'" + user.point + "'"
                    + ",'" + user.phone + "'"
                    + ",'" + user.email + "'"
                    + ",'" + user.address + "'"
                    + ")", (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else {
                        dbFunc.connectionRelease;
                        resolve(rows);
                    }
                });
            })

        });
    });

}

function updateProfile(id, user) {
    console.log("updateProfile MODEL: " + JSON.stringify(user));
    console.log("updateProfile sql: " + "UPDATE user set " +
        "name='" + user.name
        + "',point='" + user.point
        + "',phone='" + user.phone
        + "',email='" + user.email
        + "',address='" + user.address
        + "' " +
        " WHERE idU='" + id + "'");
    return new Promise((resolve, reject) => {
        bcrypt.compare(user.password, user.lastPassword, function (err, isMatch) {
            if (err) {
                reject("FAIL");
            } else if (isMatch) {
                db.query("UPDATE user set " +
                    "name='" + user.name
                    + "',point='" + user.point
                    + "',phone='" + user.phone
                    + "',email='" + user.email
                    + "',address='" + user.address
                    + "' " +
                    " WHERE idU='" + id + "'", (error, rows, fields) => {
                    if (!!error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else {
                        dbFunc.connectionRelease;
                        resolve(rows);
                    }
                });
            }
            else {
                reject({"success":false,"message":"password doesnot match"});
            }
        });
    })
}

function updateUser(id, user) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE user set " +
            "name='" + user.name
            + "',point='" + user.point
            + "',phone='" + user.phone
            + "',email='" + user.email
            + "',address='" + user.address
            + "' " +
            " WHERE idU='" + id + "'", (error, rows, fields) => {
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

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM user WHERE idU='" + id + "'", (error, rows, fields) => {
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


module.exports = userModel;

