const mongoose = require('mongoose')
const Schema = mongoose.Schema

var PostSchema = new Schema({
    studentID: {
        type: Object,
        required: true,
        ref:'Student'
    },
    categories: {
        academicLife: {
            type:Object
        },
        centerLife: {
            type: Object 
        }
    },
    timestamp:{
        type: Date,
        default: Date.now()
    }
    
});
module.exports = mongoose.model('Post', PostSchema)