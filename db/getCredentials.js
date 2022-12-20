const Credentials = require("../model/credentials-model");

async function getCredentials() {
  const collection = await Credentials.find();
  return collection.groups;
}

module.exports = getCredentials;
