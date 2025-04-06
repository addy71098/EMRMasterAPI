const UserTable = require("../models/Usertable");

async function createUser(data) {
    return await UserTable.create(data);
}

async function getAllUsers() {
    return await UserTable.findAll();
}

async function getUserByCondition(condition) {
    return await UserTable.findAll({ where: condition });
}

async function updateUser(condition, updatedData) {
    const [affectedCount] = await UserTable.update(updatedData, { where: condition });
    return affectedCount > 0; // true if rows were updated
}

async function deleteUser(condition) {
    const deletedCount = await UserTable.destroy({ where: condition });
    return deletedCount > 0; // true if rows were deleted
}
async function getSpecificUserColumns(attributes){
    return await UserTable.findAll({
        attributes: attributes//['firstname', 'lastname', 'email']
      });
}
async function getSpecificUserColumnsByCondition(attributes, condition){
    return await UserTable.findAll({
        attributes: attributes,//['firstname', 'lastname', 'email']
        where: condition
      });
}
module.exports = {
    createUser,
    getAllUsers,
    getUserByCondition,
    updateUser,
    deleteUser,
    getSpecificUserColumns,
    getSpecificUserColumnsByCondition
};


