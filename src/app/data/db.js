/**
 * Created by Dmitry Tut on 11.12.16.
 */

var mongoose = require("mongoose");
var config = require("./../../config/config");

var db = (function () {
    function db() {
        db.connect();
    }
    db.connect = function () {
        if (this.mongooseInstance)
            return this.mongooseInstance;

        this.mongooseConnection = mongoose.connection;
        this.mongooseConnection.on("error", console.error.bind(console, 'Connection error:'));
        this.mongooseConnection.once("open", function () {
            console.log("Connected to mongodb.");
        });

        this.mongooseInstance = mongoose.connect(config.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    };
    return db;
})();

db.connect();
module.exports = db;