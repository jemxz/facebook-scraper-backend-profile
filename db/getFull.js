const UsersCollection = require("../model/usersCollection-model");

async function getFull() {
  try {
    const collection = await UsersCollection.find();
    return collection;
  } catch (error) {
    return {};
  }
}

module.exports = getFull;
