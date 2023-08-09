const mongoose = require('mongoose');


const usersSchema = mongoose.Schema(
    {
        username: {
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


const User = mongoose.models.user || mongoose.model("users", usersSchema);


module.exports = User;