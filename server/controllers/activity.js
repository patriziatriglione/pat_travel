const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");
const {
    getAllActivityDB,
    getActivityByIdDB,
    deleteActivityDB,
    updateActivityDB,
    countDocuActivityDB,
    inserActivityDB,
    getActivityByQueryDB,
} = require("./../models/activityModel");

// read all activities
const getAllActivity = async (req, res) => {
    try {
        // page number
        const page = parseInt(req.query.page) || 1;
        // number of activity per page
        const perPage = parseInt(req.query.perPage) || 10;
        // filter by city 
        const searchQuery = req.query.search;
        let activities;
        if (searchQuery) {
            activities = await getActivityByQueryDB(searchQuery);
        } else {
            activities = await getAllActivityDB(page, perPage)
        }
        // calculate total number of documents and how many pages are needed to include documents based on "perPage"
        const totalActivity = await countDocuActivityDB();
        const totalPages = Math.ceil(totalActivity / perPage)
        // Sort activity by createdAt field in descending order (most recent first)
        activities.sort((a, b) => b.createdAt - a.createdAt);
        res.status(httpStatus.OK).json({
            success: true,
            data: activities,
            pageInfo: {
                currentPage: page,
                totalPages: totalPages,
                totalActivity: totalActivity
            }
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
// read only one activity
const getActivityById = async (req, res) => {
    const { id = _id } = req.params;
    try {
        const activity = await getActivityByIdDB(id)
        res.status(httpStatus.OK).json({
            success: true,
            data: activity
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
// add new Activity
const insertActivity = async (req, res) => {
    try {
        const activity = await inserActivityDB(req.body);
        res.status(httpStatus.CREATED).json({
            success: true,
            data: activity
        })
    } catch (error) {
        res.status(httpStatus.CONFLICT).json({
            success: false,
            message: error.message
        })
    }
}
// delete Activity
const deleteActivity = async (req, res) => {
    const { id = _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    try {
        await deleteActivityDB(id)
        res.status(httpStatus.OK).json({
            success: true,
            message: `Activity successfully deleted`
        })
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
        })
    }
}
// modify Activity
const updateActivity = async (req, res) => {
    const { id = _id } = req.params;
    const data = { ...req.body };
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    try {
        const activity = await updateActivityDB(id, data)
        res.status(httpStatus.OK).json({
            success: true,
            message: `Activity changed successfully`,
            data: activity
        });
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getAllActivity,
    getActivityById,
    deleteActivity,
    updateActivity,
    insertActivity
};