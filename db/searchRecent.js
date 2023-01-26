const UsersCollection = require("../model/usersCollection-model");

async function getCollection() {
  try {
    const collection = await UsersCollection.find();
    return collection[0];
  } catch (error) {
    return {};
  }
}

async function searchRecent(searchRecent) {
  try {
    const result = await getCollection();
    const items = [];
    result.users.map((e) => {
      e.posts.map((e1) => {
        const str1 = e1.postContent.toLowerCase();
        const str2 = searchRecent.toLowerCase();
        if (str1.includes(str2)) {
          var temp = {
            group_id: e._id,
            userName: e.name,
            userLink: e.facebookLink,
            _id: e1._id,
            postLink: e1.postId,
            postContent: e1.postContent,
            numberOfLikes: e1.numberOfLikes,
            numberOfShares: e1.numberOfShares,
            timeOfPost: e1.timeOfPost,
          };
          items.push(temp);
        }
      });
    });
    return items;
  } catch (error) {
    return {};
  }
}

module.exports = searchRecent;
