const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
name: {
    type: String,
    required: true,
    unique:true
},
location: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true,
    unique: true
},
password: {
    type: String,
    required: true
},
role: {
    type: String,
    default: 'USER'
},
plan:  {
    type: String,
    default: 'silver'
}
})
module.exports = mongoose.model('User', userSchema)