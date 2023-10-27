const User = require("./user");

// read all users
const getallUserDB = async (page, perPage) => {
    return User.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
};
// read only one user
const getUserByIdDB = async (users) => {
    return User.find({
        _id: { $in: users }
    })
};
//delete user
const deleteUserDB = async (_id) => {
    return User.findByIdAndDelete(_id);
};
// modify user
const updateUserDB = async (_id, data) => {
    return User.findByIdAndUpdate(_id, data, { new: true })
};
// calculate total number of user
const countDocuUserDB = async () => {
    return User.countDocuments()
};

module.exports = {
    getallUserDB,
    getUserByIdDB,
    countDocuUserDB,
    deleteUserDB,
    updateUserDB,
}