const Food = require("./food")

// read all foods
const getAllFoodDB = async (page, perPage) => {
    return Food.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
};
// reand only one food
const getFoodByIdDB = async (foods) => {
    return Food.find({
        _id: { $in: foods }
    })
};
// add new food
const inserFoodDB = async (food) => {
    const newFood = new Food(food);
    await newFood.save();
    return newFood;
};
//delete food
const deleteFoodDB = async (_id) => {
    return Food.findByIdAndDelete(_id);
};
//modify food
const updateFoodDB = async (_id, data) => {
    return Food.findByIdAndUpdate(_id, data, { new: true })
};
// calculate total number of food
const countDocuFoodDB = async () => {
    return Food.countDocuments()
};
// city/nation
const getFoodByQueryDB = async (searchQuery) => {
    try {
        const searchPattern = new RegExp(searchQuery, "i");
        const foods = await Food.find({
            $or: [
                { city: searchPattern },
                { nation: searchPattern },
            ]
        });
        return foods;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllFoodDB,
    getFoodByIdDB,
    deleteFoodDB,
    updateFoodDB,
    countDocuFoodDB,
    inserFoodDB,
    getFoodByQueryDB,
}