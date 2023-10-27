const Structure = require("./structure")

// read all structure
const getallStructureDB = async (page, perPage) => {
    return Package.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
};
// read only one structure
const getStructureByIdDB = async (structures) => {
    return Structure.find({
        _id: { $in: structures }
    })
};
// insert structure
const insertStructureDB = async (structure) => {
    const newStructure = new Structure(structure);
    await newStructure.save();
    return newStructure
}
//delete structure
const deleteStructureDB = async (_id) => {
    return Structure.findByIdAndDelete(_id);
};
// modify structure
const updateStructureDB = async (_id, data) => {
    return Structure.findByIdAndUpdate(_id, data, { new: true })
};
// calculate total number of structure 
const countDocuStructureDB = async () => {
    return Structure.countDocuments()
};

module.exports = {
    getStructureByIdDB,
    getallStructureDB,
    countDocuStructureDB,
    deleteStructureDB,
    updateStructureDB,
    insertStructureDB
}