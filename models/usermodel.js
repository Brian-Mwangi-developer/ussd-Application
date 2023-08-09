const mongoose = require('mongoose');


const usersSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }, {
    timestamps: true,
}
);

module.exports = mongoose.model("users", usersSchema);