/**
 * Created by Dmitry Tut on 11.12.16.
 */

var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    text : {
        type: String,
        unique: true,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    dataCreated : {
        type: Date
    }
});

var ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;