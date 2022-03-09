const fs = require('fs')
var arr = fs.readFileSync('/home/ubuntu/Desktop/osint/Facebook/facebook-scraper-backend-profile/credentials.txt', 'utf-8').split('\n')

let count = Math.floor(Math.random()*4)

if(count%2==0){
    var email = arr[count];
    var password = arr[count+1];
} else {
    var email = arr[count-1]
    var password = arr[count]
}

async function login(page){
    // NAVIGATION TO THE FACEBOOK PAGE //
    await page.goto('https://facebook.com/login', {waitUntil: 'networkidle2', waitUntil: 'load'});    
    // ENTERING EMAIL AND PASSWORD //
    await page.waitForSelector("#email");
     await page.type("#email", email,   { delay: 30 });
     await page.waitForSelector("#pass");
    await page.focus("#pass")
    await page.type("#pass", password, { delay: 30 });
    await page.click('#loginbutton');
     await page.waitForNavigation();
     console.log("Loging in succesfull ... ");
    
}

module.exports = login
