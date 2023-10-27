const Activity = require("./activity")

// read all activities
const getAllActivityDB = async (page, perPage) => {
    return Activity.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
};
// reand only one activity
const getActivityByIdDB = async (activities) => {
    return Activity.find({
        _id: { $in: activities }
    })
};
// add new activity
const inserActivityDB = async (activity) => {
    const newActivity = new Activity(activity);
    await newActivity.save();
    return newActivity;
};
//delete activity
const deleteActivityDB = async (_id) => {
    return Activity.findByIdAndDelete(_id);
};
//modify activity
const updateActivityDB = async (_id, data) => {
    return Activity.findByIdAndUpdate(_id, data, { new: true })
};
// calculate total number of activity
const countDocuActivityDB = async () => {
    return Activity.countDocuments()
};
// city/nation
const getActivityByQueryDB = async (searchQuery) => {
    try {
        const searchPattern = new RegExp(searchQuery, "i");
        const activities = await Activity.find({
            $or: [
                { city: searchPattern },
                { nation: searchPattern },
            ]
        });
        return activities;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllActivityDB,
    getActivityByIdDB,
    deleteActivityDB,
    updateActivityDB,
    countDocuActivityDB,
    inserActivityDB,
    getActivityByQueryDB,
}