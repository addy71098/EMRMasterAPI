const TblEmailOtp = require("../models/Tblemailotp");

async function createEmailOTPEntry(data) {
    return await TblEmailOtp.create(data);
}

async function getAllEmailOTPEntries() {
    return await TblEmailOtp.findAll();
}

async function getEmailOTPEntriesByCondition(condition) {
    return await TblEmailOtp.findAll({ where: condition });
}

async function updateEmailOTPEntry(condition, updatedData) {
    const [affectedCount] = await TblEmailOtp.update(updatedData, { where: condition });
    return affectedCount > 0; // true if rows were updated
}

async function deleteEmailOTPEntry(condition) {
    const deletedCount = await TblEmailOtp.destroy({ where: condition });
    return deletedCount > 0; // true if rows were deleted
}
async function getSpecificEmailOTPEntryColumns(attributes){
    return await TblEmailOtp.findAll({
        attributes: attributes//['firstname', 'lastname', 'email']
      });
}
async function getSpecificEmailOTPEntryColumnsByCondition(attributes, condition){
    return await TblEmailOtp.findAll({
        attributes: attributes,//['firstname', 'lastname', 'email']
        where: condition
      });
}
module.exports = {
    createEmailOTPEntry,
    getAllEmailOTPEntries,
    getEmailOTPEntriesByCondition,
    updateEmailOTPEntry,
    deleteEmailOTPEntry,
    getSpecificEmailOTPEntryColumns,
    getSpecificEmailOTPEntryColumnsByCondition
};