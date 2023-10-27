const Package = require("./package")

// read all package
const getAllPackageDB = async (page, perPage) => {
    return Package.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
};
// reand only one package
const getPackageByIdDB = async (packages) => {
    return Package.find({
        _id: { $in: packages }
    })
};
// add new package
const inserPackageDB = async (package) => {
    const newPackage = new Package(package);
    await newPackage.save();
    return newPackage;
};
//delete package
const deletePackageDB = async (_id) => {
    return Package.findByIdAndDelete(_id);
};
//modify package
const updatePackageDB = async (_id, data) => {
    return Package.findByIdAndUpdate(_id, data, { new: true })
};
// calculate total number of package
const countDocuPackageDB = async () => {
    return Package.countDocuments()
};
// city
const getPackagesByQueryDB = async (searchQuery) => {
    try {
        const searchPattern = new RegExp(searchQuery, "i");
        const packages = await Package.find({
            $or: [
                { city: searchPattern },
                { nation: searchPattern },
            ]
        });
        return packages;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllPackageDB,
    getPackageByIdDB,
    deletePackageDB,
    updatePackageDB,
    countDocuPackageDB,
    inserPackageDB,
    getPackagesByQueryDB
}