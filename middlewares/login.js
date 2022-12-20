const fs = require("fs");
const fss = require("fs").promises;
var arr = fs.readFileSync("./credentials.txt", "utf-8").split("\n");

let count = Math.floor(Math.random() * 4);

if (count % 2 == 0) {
  var email = arr[count];
  var password = arr[count + 1];
} else {
  var email = arr[count - 1];
  var password = arr[count];
}

async function login(page) {
  // NAVIGATION TO THE FACEBOOK PAGE //
  await page.goto("https://facebook.com/login", {
    waitUntil: "networkidle2",
    waitUntil: "load",
  });
  // ENTERING EMAIL AND PASSWORD //
  await page.waitForSelector("#email");
  await page.type("#email", email, { delay: 30 });
  console.log("Inserted email");
  await page.waitForSelector("#pass");
  await page.focus("#pass");
  await page.type("#pass", password, { delay: 30 });
  console.log("Inserted Password");
  await page.keyboard.press("Enter");
  //await page.click('#loginbutton');
  await page.waitForNavigation();
  console.log("Loging in succesfull ... ");
  await page.goto("https://m.facebook.com");
  const cookies = await page.cookies();
  await fss.writeFile("./cookies.json", JSON.stringify(cookies, null, 2));
}

module.exports = login;
