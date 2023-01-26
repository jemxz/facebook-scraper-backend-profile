const UserCollection = require("../model/usersCollection-model");

async function getDate() {
  try {
    const collection = await UserCollection.find({}).select("date");
    return collection;
  } catch (error) {
    return {};
  }
}

module.exports = getDate;
