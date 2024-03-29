const UsersCollection = require("../model/usersCollection-model");

async function getCollectionById(id) {
  try {
    const collection = await UsersCollection.findById(id);
    return collection.users;
  } catch (error) {
    return {};
  }
}

async function getComment(id, id2, id3, id4) {
  try {
    const groupDocument = await getCollectionById(id);
    const group = groupDocument.find(({ id }) => id === id2);
    const postDocument = group.posts;
    const post = postDocument.find((e) => e.id === id3);
    const commentDocument = post.comments;
    const comment = commentDocument.find((e) => e.id === id4);
    return comment;
  } catch (error) {
    return {};
  }
}

module.exports = getComment;
// getComment('5ff6c0867d514016b0b7fc6c', "5ff6c0867d514016b0b7fc6d", "5ff6c0867d514016b0b7fc6e", "5ff6c0867d514016b0b7fc6f")
