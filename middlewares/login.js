const fs = require('fs')
var arr = fs.readFileSync('./credentials.txt', 'utf-8').split('\n')

const email = arr[0];
const password = arr[1];



async function login(page){
    // NAVIGATION TO THE FACEBOOK PAGE //
    await page.goto('https://facebook.com/login', {waitUntil: 'networkidle2', waitUntil: 'load'});    
    // ENTERING EMAIL AND PASSWORD //
    await page.waitForSelector("#email");
     await page.type("#email", email,   { delay: 30 });
     await page.waitForSelector("#pass");
    await page.focus("#pass")
    await page.type("#pass", password, { delay: 30 });
     //await page.click('#u_0_b');
     await page.waitForNavigation();
     console.log("Loging in succesfull ... ");
    
}

module.exports = login
