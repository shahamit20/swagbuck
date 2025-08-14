const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Phone: Number,
    Age: String,
    Password:Number

  });
const detail = mongoose.model('detail', detailSchema )  
module.exports = detail