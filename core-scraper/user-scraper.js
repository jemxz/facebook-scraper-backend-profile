const scrollToBottom = require('../middlewares/auto-scroll');
const createUser = require('./post-scraper')
const getAbout = require('./about-scraper')
const fs = require('fs')



const target = fs.readFileSync('./target.txt', 'utf-8').split('\n')



module.exports = async function createUsers(browser, page){
    
    const users = []
    
    for (let i = 0; i < target.length; i++) {
        
        const postIds = []
        // NAVIGATION AND SCROLING TO THE DESIRED PAGE //
        try { 
            await page.goto(target[i]);
            await page.waitFor(1000)
            console.log("navigation succesfull");
            
        } catch(error){
            console.log(error.message);
        }
        
        const info = await getAbout(page)
           

            try{
                    await scrollToBottom(page)
                    console.log("scrolling success");
                } catch (error) {
                    return console.log(error.message);
                }

            // Scraping for all post Links on a given page //
            try {
                let div_selector= "._52jc"; 
        
                let list_length = await page.evaluate((sel) => {
                        let elements = Array.from(document.querySelectorAll(sel));
                        return elements.length;
                }, div_selector);
                for(let i=0; i< list_length; i++){
                    var href = await page.evaluate((l, sel) => {
                        let elements= Array.from(document.querySelectorAll(sel))
                        let anchor  = elements[l].getElementsByTagName('a')[0]
                        if(anchor){
                            return anchor.href;
                        }else{
                            return 'empty';
                        }
                    }, i, div_selector);
                    postIds.push(href)
                    }  
                } catch (error) {
                    return console.log(error.message)
                } 
                
            // Scraping the numberOfFriends of a given page  // 
            try {
                let selector = "._7-1j";            
                var numberOfFollowers = await page.evaluate((sel) => {
                            let elements = []
                            elements= Array.from(document.querySelectorAll(sel))
                            let anchor  = elements[4]
                            if(anchor){
                                return anchor.innerText;
                            }else{
                                return 'empty';
                            }
                        }, selector);
                } catch (error) {
                    return console.log(error.message)
                }
            
            // Scraping the about Section of a given page //
            try {
                let selector = "._7i5d";            
                var about = await page.evaluate((sel) => {
                            let elements = []
                            elements= Array.from(document.querySelectorAll(sel))
                            let anchor  = elements[1]
                            if(anchor){
                                return anchor.innerText;
                            }else{
                                return 'empty';
                            }
                        }, selector);
                } catch (error) {
                    return console.log(error.message)
                }
                
            // Scraping the name of a given user //
            try {
                let selector = "._6x2x";            
                var nameOfGroup = await page.evaluate((sel) => {
                            let elements = []
                            elements= Array.from(document.querySelectorAll(sel))
                            let anchor  = elements[0]
                            if(anchor){
                                return anchor.innerText;
                            }else{
                                return 'empty';
                            }
                        }, selector);
                } catch (error) {
                    return console.log(error.message)
                }
        
                
                

            const arr = postIds.filter(postId => postId !== "empty")
            const posts = await createUser(page, arr)
            
        
            users.push({
                name: nameOfGroup,
                numberOfFriends: numberOfFollowers,
                about: about,
                info: info,
                facebookLink: target[i],
                posts: posts
            })
            
            
        }
    console.log(users);
    return users
 
        
}


// createUsers()
// module.exports = getPosts