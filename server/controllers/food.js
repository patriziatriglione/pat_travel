const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");
const {
    getAllFoodDB,
    getFoodByIdDB,
    deleteFoodDB,
    updateFoodDB,
    countDocuFoodDB,
    inserFoodDB,
    getFoodByQueryDB,
} = require("./../models/foodModel");

// read all foods
const getAllFood = async (req, res) => {
    try {
        // page number
        const page = parseInt(req.query.page) || 1;
        // number of food per page
        const perPage = parseInt(req.query.perPage) || 10;
        // filter by city 
        const searchQuery = req.query.search;
        let foods;
        if (searchQuery) {
            foods = await getFoodByQueryDB(searchQuery);
        } else {
            foods = await getAllFoodDB(page, perPage)
        }
        // calculate total number of documents and how many pages are needed to include documents based on "perPage"
        const totalFood = await countDocuFoodDB();
        const totalPages = Math.ceil(totalFood / perPage)
        // Sort food by createdAt field in descending order (most recent first)
        foods.sort((a, b) => b.createdAt - a.createdAt);
        res.status(httpStatus.OK).json({
            success: true,
            data: foods,
            pageInfo: {
                currentPage: page,
                totalPages: totalPages,
                totalFood: totalFood
            }
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
// read only one food
const getFoodById = async (req, res) => {
    const { id = _id } = req.params;
    try {
        const food = await getFoodByIdDB(id)
        res.status(httpStatus.OK).json({
            success: true,
            data: food
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
// add new Food
const insertFood = async (req, res) => {
    try {
        const food = await inserFoodDB(req.body);
        res.status(httpStatus.CREATED).json({
            success: true,
            data: food
        })
    } catch (error) {
        res.status(httpStatus.CONFLICT).json({
            success: false,
            message: error.message
        })
    }
}
// delete Food
const deleteFood = async (req, res) => {
    const { id = _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    try {
        await deleteFoodDB(id)
        res.status(httpStatus.OK).json({
            success: true,
            message: `Food successfully deleted`
        })
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
        })
    }
}
// modify Food
const updateFood = async (req, res) => {
    const { id = _id } = req.params;
    const data = { ...req.body };
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    try {
        const food = await updateFoodDB(id, data)
        res.status(httpStatus.OK).json({
            success: true,
            message: `Food changed successfully`,
            data: food
        });
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getAllFood,
    getFoodById,
    deleteFood,
    updateFood,
    insertFood,
};