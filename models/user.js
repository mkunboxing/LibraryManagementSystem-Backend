const mongoose = require("mongoose");  

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    libraryId: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        // required: true
    },
    sub:{
        type: String,
        // required: true
    },
    displayName:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", UserSchema);

