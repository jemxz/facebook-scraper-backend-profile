const puppeteer = require('puppeteer');
const login = require('./middlewares/login')
const createUsers = require('./core-scraper/user-scraper')
const GroupsCollection = require('./model/usersCollection-model')
const mongoose = require('mongoose');
const schedule = require('node-schedule');

mongoose.connect('mongodb://localhost/facebook-data', {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err.message))


async function createGroupsCollection(){


    var date = new Date().toLocaleString()
   

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--disable-notifications"]
    });

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(100000)

    // LOGING IN TO A FACEBOOK ACCOUNT --- //
    try {
            await login(page)
        } catch (error) {
            return console.log(error.message)
        }
    
        const users = await createUsers(browser, page)
        var date = new Date().toLocaleString()

        const group = new GroupsCollection({
            users: users,
            date: date
         })
         
         const result = await group.save()
         // console.log(result);
         browser.close();
    
}

schedule.scheduleJob("*/400 * * * *", () => {
    createGroupsCollection();
})