const puppeteer = require("puppeteer");
const login = require("./middlewares/login");
const createUsers = require("./core-scraper/user-scraper");
const GroupsCollection = require("./model/usersCollection-model");
const mongoose = require("mongoose");
const fs = require("fs").promises;
const fss = require("fs");
const schedule = require("node-schedule");
const path = "./cookies.json";

mongoose
  .connect("mongodb://localhost/facebook-data", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err.message));

async function createGroupsCollection() {
  var date = new Date().toLocaleString();

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--disable-notifications"],
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(100000);

  // LOGING IN TO A FACEBOOK ACCOUNT --- //
  try {
    if (fss.existsSync(path)) {
      const cookiesString = await fs.readFile("./cookies.json");
      const cookies = JSON.parse(cookiesString);
      await page.setCookie(...cookies);
    } else {
      await login(page);
    }
  } catch (error) {
    return console.log(error.message);
  }

  const users = await createUsers(browser, page);
  var date = new Date().toLocaleString();

  const group = new GroupsCollection({
    users: users,
    date: date,
  });

  const result = await group.save();
  // console.log(result);
  browser.close();
}
createGroupsCollection();

// schedule.scheduleJob("*/5 * * * *", () => {
//   createGroupsCollection();
// });
