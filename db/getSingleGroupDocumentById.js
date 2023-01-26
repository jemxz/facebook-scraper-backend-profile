const UsersCollection = require("../model/usersCollection-model");

async function getCollectionById(id) {
  try {
    const collection = await UsersCollection.findById(id);
    return collection.users;
  } catch (error) {
    return {};
  }
}

async function getGroup(id, id2) {
  try {
    const result = await getCollectionById(id);
    const group = result.find(({ id }) => id === id2);
    return group;
  } catch (error) {
    return {};
  }
}

module.exports = getGroup;
// getGroup('5ff6c0867d514016b0b7fc6c', "5ff6c0867d514016b0b7fc6d")
