const puppeteer = require('puppeteer');
const login = require('./middlewares/login')
const createGroups = require('./core-scraper/group-scraper')
const GroupsCollection = require('./Model/groupsCollection-model')
const mongoose = require('mongoose');
var CronJob = require('cron').CronJob;

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
    
        const groups = await createGroups(page)
        var date = new Date().toLocaleString()

        const group = new GroupsCollection({
            groups: groups,
            date: date
         })
         const result = await group.save()
         console.log(result);
    
}

createGroupsCollection()