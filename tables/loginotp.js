const LoginOtp = require("../models/Loginotp");

async function createLoginOTPEntry(data) {
    return await LoginOtp.create(data);
}

async function getAllLoginOTPEntries() {
    return await LoginOtp.findAll();
}

async function getLoginOTPEntriesByCondition(condition) {
    return await LoginOtp.findAll({ where: condition });
}

async function updateLoginOTPEntry(condition, updatedData) {
    const [affectedCount] = await LoginOtp.update(updatedData, { where: condition });
    return affectedCount > 0; // true if rows were updated
}

async function deleteLoginOTPEntry(condition) {
    const deletedCount = await LoginOtp.destroy({ where: condition });
    return deletedCount > 0; // true if rows were deleted
}
async function getSpecificLoginOTPEntryColumns(attributes){
    return await LoginOtp.findAll({
        attributes: attributes//['firstname', 'lastname', 'email']
      });
}
async function getSpecificLoginOTPEntryColumnsByCondition(attributes, condition){
    return await LoginOtp.findAll({
        attributes: attributes,//['firstname', 'lastname', 'email']
        where: condition
      });
}
module.exports = {
    createLoginOTPEntry,
    getAllLoginOTPEntries,
    getLoginOTPEntriesByCondition,
    updateLoginOTPEntry,
    deleteLoginOTPEntry,
    getSpecificLoginOTPEntryColumns,
    getSpecificLoginOTPEntryColumnsByCondition
};