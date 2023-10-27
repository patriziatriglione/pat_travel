const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");
const {
    deleteStructureDB,
    updateStructureDB,
    countDocuStructureDB,
    getStructureByIdDB,
    insertStructureDB,
    getallStructureDB } = require("../models/structureModel");
const Package = require("./../models/package")

// read all structures
const getallStructure = async (req, res) => {
    try {
        // page number
        const page = parseInt(req.query.page) || 1;
        // number of  structure per page
        const perPage = parseInt(req.query.perPage) || 10;
        // calculate total number of documents and how many page are needed
        const totalStructure = await countDocuStructureDB();
        const totalPages = Math.ceil(totalStructure / perPage)
        const structures = await getallStructureDB(page, perPage)
        res.status(httpStatus.OK).json({
            success: true,
            data: structures,
            pageInfo: {
                currentPage: page,
                totalPages: totalPages,
                totalStructure: totalStructure
            }
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
// read only one structure
const getStructureById = async (req, res) => {
    const { id = _id } = req.params;
    try {
        const structure = await getStructureByIdDB(id)
        res.status(httpStatus.OK).json({
            success: true,
            data: structure
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
// add new Structure
const insertStructure = async (req, res) => {
    const packageId = req.params.packageid;
    try {
        const saveStructure = await insertStructureDB(req.body);
        try {
            await Package.findByIdAndUpdate(packageId,
                { structure: saveStructure._id.toString() }
            );
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                error: message.error
            })
        }
        res.status(httpStatus.OK).json({
            success: true,
            data: saveStructure
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: message.error
        })
    }
}
// delete structure
const deleteStructure = async (req, res) => {
    const { id = _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id"
        })
    }
    const packageId = req.params.packageIdlid;
    try {
        await deleteStructureDB(id)
        await Package.findByIdAndUpdate(packageId, {
            $pull: { structure: req.params.id }
        })
        res.status(httpStatus.OK).json({
            success: true,
            message: "structure successfully deleted"
        })
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
        })
    }
}
//modify structure
const updateStructure = async (req, res) => {
    const { id = _id } = req.params;
    const data = { ...req.body };
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    try {
        const structure = await updateStructureDB(id, data)
        res.status(httpStatus.OK).json({
            success: true,
            message: `structure  changed successfully`,
            data: structure
        });
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    deleteStructure,
    updateStructure,
    insertStructure,
    getallStructure,
    getStructureById
}