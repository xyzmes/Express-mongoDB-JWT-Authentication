const mongo = require('mongoose')

const userSchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 15
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 512
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongo.model('User', userSchema)