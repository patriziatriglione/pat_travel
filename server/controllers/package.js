const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");
const {
    getAllPackageDB,
    getPackageByIdDB,
    deletePackageDB,
    updatePackageDB,
    countDocuPackageDB,
    inserPackageDB,
    getPackagesByQueryDB
} = require("./../models/packageModel")

// read all packages
const getAllPackage = async (req, res) => {
    try {
        // page number
        const page = parseInt(req.query.page) || 1;
        // number of package per page
        const perPage = parseInt(req.query.perPage) || 10;
        // filter by city 
        const searchQuery = req.query.search;
        let packages;
        if (searchQuery) {
            packages = await getPackagesByQueryDB(searchQuery);
        } else {
            packages = await getAllPackageDB(page, perPage)
        }
        // calculate total number of documents and how many pages are needed to include documents based on "perPage"
        const totalPackage = await countDocuPackageDB();
        const totalPages = Math.ceil(totalPackage / perPage)
        // Sort packages by createdAt field in descending order (most recent first)
        packages.sort((a, b) => b.createdAt - a.createdAt);
        res.status(httpStatus.OK).json({
            success: true,
            data: packages,
            pageInfo: {
                currentPage: page,
                totalPages: totalPages,
                totalPackage: totalPackage
            }
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
// read only one package
const getPackageById = async (req, res) => {
    const { id = _id } = req.params;
    try {
        const package = await getPackageByIdDB(id)
        res.status(httpStatus.OK).json({
            success: true,
            data: package
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
// add new Package
const insertPackage = async (req, res) => {
    try {
        const package = await inserPackageDB(req.body);
        res.status(httpStatus.CREATED).json({
            success: true,
            data: package
        })
    } catch (error) {
        res.status(httpStatus.CONFLICT).json({
            success: false,
            message: error.message
        })
    }
}
// delete Package
const deletePackage = async (req, res) => {
    const { id = _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    try {
        await deletePackageDB(id)
        res.status(httpStatus.OK).json({
            success: true,
            message: `Package successfully deleted`
        })
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
        })
    }
}
// modify Package
const updatePackage = async (req, res) => {
    const { id = _id } = req.params;
    const data = { ...req.body };
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    try {
        const package = await updatePackageDB(id, data)
        res.status(httpStatus.OK).json({
            success: true,
            message: `Package changed successfully`,
            data: package
        });
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getAllPackage,
    getPackageById,
    deletePackage,
    updatePackage,
    insertPackage
};