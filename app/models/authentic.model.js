var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
const bcrypt = require('bcrypt');

var authenticModel = {
    authentic: authentic,
    signup: signup,
    getPermission: getPermission
}

function getPermission() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM permission", (error, rows, fields) => {
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

function authentic(authenticData) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM user" +
            " INNER JOIN permission ON user.idMode = permission.idMode " +
            " WHERE username =" + "'" + authenticData.username + "'", (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
                if (rows.length == 0) {
                    reject(false);
                } else {
                    console.log("authenticData: " + JSON.stringify(authenticData));
                    bcrypt.compare(authenticData.password, rows[0].password, function (err, isMatch) {
                        if (err) {
                            reject(error);
                        } else if (isMatch) {
                            resolve(rows);
                        }
                        else {
                            reject({"success":false,"message":"password doesnot match"});
                        }
                    });
                }
            }
        });
    });

}


function signup(user) {
    let idMode = user.idMode || 4;
    let name = user.name || user.username;
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
                db.query("SELECT * FROM user WHERE username='"+user.username+"'", (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else if(rows.length>0) {
                        dbFunc.connectionRelease;
                        reject({"success":false,"message":"user already exist ! try with different user"});
                    } else {
                        db.query("INSERT INTO user(username, password, name, idMode)VALUES('" +
                            user.username + "','" +
                            user.password + "','" +
                            name + "','" +
                            idMode + "')", (error, rows, fields) => {
                            if (error) {
                                dbFunc.connectionRelease;
                                reject(error);
                            } else {
                                dbFunc.connectionRelease;
                                db.query("SELECT * FROM user" +
                                    " INNER JOIN permission ON user.idMode = permission.idMode " +
                                    " WHERE username =" + "'" + user.username + "'"
                                    , (error, rows, fields) => {
                                    if (error) {
                                        dbFunc.connectionRelease;
                                        reject(error);
                                    } else {
                                        dbFunc.connectionRelease;
                                        resolve(rows);
                                    }
                                });
                            }
                        });
                    }
                });
            })

        });
    });
}

module.exports = authenticModel;



