
const scrollToBottom = require('../middlewares/auto-scroll');
module.exports = async function getAbout(page){

    let about = []
    let aboutSubjectTags = []
    let aboutSubjects = []
    let name = []
    let discription = []

        try {
               let options = {button : "middle"};
               await page.click("._5xu4")
               await page.waitFor(1000) 
               await scrollToBottom(page)
               console.log("scrolling success");
               
            } catch (error) {
                console.log(error.message);
        }
       
    ////////////////////// SCRAPES FOR THE TAGS OF A SUBJECT ///////////////////////
            try {
                    let selector = "._5cdv";
                    let totalNames = await page.evaluate((sel) => {
                    let elements = Array.from(document.querySelectorAll(sel));
                    return elements.length;
                    }, selector);

                    for (let i = 0; i < totalNames; i++) {
                            var basicInfo = await page.evaluate((l, sel) => {
                            let elements = Array.from(document.querySelectorAll(sel))
                            let anchor   = elements[l]
                            if(anchor){
                                return anchor.innerText;
                            }else{
                                return 'empty';
                            }
                        }, i, selector);
                    
                        name.push(basicInfo)  
                    }
            } catch (error) {
                return console.log(error.message)
            }
    ////////////////////// SCRAPES FOR THE DISCRIPTION OF TAGS OF A SUBJECT ///////////////
            try {
                let selector = "._52jd._52ja";
                let totalDiscripition = await page.evaluate((sel) => {
                    let elements = Array.from(document.querySelectorAll(sel));
                    return elements.length;
                }, selector);
                
                for (let i = 0; i < totalDiscripition; i++) {
                    
                    var info = await page.evaluate((l, sel) => {
                        let elements = Array.from(document.querySelectorAll(sel))
                        let anchor  = elements[l]
                        if(anchor){
                            console.log(anchor.innerText);
                            return anchor.innerText;
                        }else{
                            return 'empty';
                        }
                    },i, selector);
                    discription.push(info)  
                }
                } catch (error) {
                    return console.log(error.message)
                }
    ///////////////////////////////// SCRAPES FOR SUBJECT CONNECTIONS AND HOBBIES TAGS //////////
            try {
                let selector = "._5b6o._5b6q";
                let totalDiscripition = await page.evaluate((sel) => {
                    let elements = Array.from(document.querySelectorAll(sel));
                    return elements.length;
                }, selector);
                
                for (let i = 0; i < totalDiscripition; i++) {
                    
                    var tags = await page.evaluate((l, sel) => {
                        let elements = Array.from(document.querySelectorAll(sel))
                        let anchor  = elements[l]
                        if(anchor){
                            return anchor.innerText;
                        }else{
                            return 'empty';
                        }
                    },i, selector);
                    aboutSubjectTags.push(tags)  
                }
                } catch (error) {
                    return console.log(error.message)
                }
    ///////////////////////////////// SCRAPES FOR SUBJECT CONNECTIONS AND HOBBIES TAGS //////////
            try {
                let selector = "._55x2._5ji7";
                let totalDiscripition = await page.evaluate((sel) => {
                    let elements = Array.from(document.querySelectorAll(sel));
                    return elements.length;
                }, selector);
                
                for (let i = 0; i < totalDiscripition; i++) {
                    
                    var info = await page.evaluate((l, sel) => {
                        let elements = Array.from(document.querySelectorAll(sel))
                        let anchor  = elements[l]
                        if(anchor){
                            return anchor.innerText;
                        }else{
                            return 'empty';
                        }
                    },i, selector);
                    aboutSubjects.push(info)  
                }
                } catch (error) {
                    return console.log(error.message)
                }
                try {
                    await page.goBack()
                } catch (error) {
                    return console.log(error.message);
                }
    /////////////////////////// Create about profile /////////////////////////////
                for (let i = 0; i < name.length; i++) {
                    about.push({[discription[i]] : name[i]})
                    
                }
            return about
}


