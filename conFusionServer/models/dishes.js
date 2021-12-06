const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        require: true
    },
    author:{
        type: String,
        required: true
    },
},{
    timestaps: true
});
  
const dishSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    label:{
        type: String,
        default: ""
    },
    price:{
        type: Currency,
        required: true,
        min: 0
    },
    featured:{
        type: Boolean,
        default: false
    },
    description:{
        type: String,
        require:true,
    },
    comments: [ commentSchema ]

} , {
    timestamps:true
});


var Dishes = mongoose.model("Dish" , dishSchema);

module.exports = Dishes;