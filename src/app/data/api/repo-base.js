/**
 * Created by Dmitry Tut on 11.12.16.
 */

var mongoose = require("mongoose");

var repoBase = (function () {
    function repoBase(schemaModel) {
        this._model = schemaModel;
    }
    repoBase.prototype.create = function (item, callback) {
        this._model.create(item, callback);
    };

    repoBase.prototype.retrieve = function (callback) {
        this._model.find({}, callback);
    };

    repoBase.prototype.update = function (_id, item, callback) {
        this._model.update({ _id: _id }, item, callback);
    };

    repoBase.prototype.delete = function (_id, callback) {
        this._model.remove({ _id: this.toObjectId(_id) }, function (err) {
            return callback(err, null);
        });
    };

    repoBase.prototype.findById = function (_id, callback) {
        this._model.findById(_id, callback);
    };

    repoBase.prototype.toObjectId = function (_id) {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    };
    return repoBase;
})();

module.exports = repoBase;