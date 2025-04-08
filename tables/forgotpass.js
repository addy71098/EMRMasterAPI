const ForgotPass = require("../models/Forgotpass");

async function createForgotPassEntry(data) {
    return await ForgotPass.create(data);
}

async function getAllForgotPassEntries() {
    return await ForgotPass.findAll();
}

async function getForgotPassEntriesByCondition(condition) {
    return await ForgotPass.findAll({ where: condition });
}

async function updateForgotPassEntry(condition, updatedData) {
    const [affectedCount] = await ForgotPass.update(updatedData, { where: condition });
    return affectedCount > 0; // true if rows were updated
}

async function deleteForgotPassEntry(condition) {
    const deletedCount = await ForgotPass.destroy({ where: condition });
    return deletedCount > 0; // true if rows were deleted
}
async function getSpecificForgotPassEntryColumns(attributes){
    return await ForgotPass.findAll({
        attributes: attributes//['firstname', 'lastname', 'email']
      });
}
async function getSpecificForgotPassEntryColumnsByCondition(attributes, condition){
    return await ForgotPass.findAll({
        attributes: attributes,//['firstname', 'lastname', 'email']
        where: condition
      });
}
module.exports = {
    createForgotPassEntry,
    getAllForgotPassEntries,
    getForgotPassEntriesByCondition,
    updateForgotPassEntry,
    deleteForgotPassEntry,
    getSpecificForgotPassEntryColumns,
    getSpecificForgotPassEntryColumnsByCondition
};