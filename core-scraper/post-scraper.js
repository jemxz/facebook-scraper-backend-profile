const logToFile = require("log-to-file");

module.exports = async function createPosts(page, postIds){
    console.log(postIds.length);
    const posts = []
    const postLinks = postIds

    for (let i = 0; i < postLinks.length; i++) {

        const commentContents = []
        const ids = []
        const names = []
        const comments = []
        

    // NAVIGATION TO DESIRED PAGE         
        if (postLinks[i] === 'empty') {
            posts.push ({
                postId: "",
                postContent:"",
                numberOflikes: "",
                numberOfShares: "",
                timeOfPost: "",
                comments: []
            })
        } else {
        // Navigation to the right page    
            try {
                await page.goto(postLinks[i]);
                await page.waitFor(5000)
                // console.log("navigation succesfull");
            
            } catch (error) {
                logToFile(error.message, '../../../../logs/FacebookusersError.log')
                return console.log(error.message);
            }


        // Scraping for post content of a given post using postIds //             
            try {
                let post_selector= "._5rgt"; 
                let post_length = await page.evaluate((sel) => {
                    let elements = Array.from(document.querySelectorAll(sel));
                    return elements.length;
                }, post_selector);
                for(let i=0; i< post_length; i++){
                    var postContent = await page.evaluate((l, sel) => {
                                let elements= Array.from(document.querySelectorAll(sel))
                                let anchor  = elements[l]
                                if(anchor){
                                    return anchor.innerText;
                                }else{
                                    return 'empty';
                                }
                            }, i, post_selector);
                } 
                // console.log(commentContents);
                // return comments
                    
                } catch (error) {
                    logToFile(error.message, '../../../../logs/FacebookusersError.log')
                    return console.log(error.message)
                }

        // Scraping for comments of a given post using postIds   //
            try {
                let post_selector= "._2b06"; 
                let post_length = await page.evaluate((sel) => {
                    let elements = Array.from(document.querySelectorAll(sel));
                    return elements.length;
                }, post_selector);
                for(let i=0; i< post_length; i++){
                    var postComment = await page.evaluate((l, sel) => {
                                let elements= Array.from(document.querySelectorAll(sel))
                                let anchor  = elements[l]
                                if(anchor){
                                    return anchor.innerText;
                                }else{
                                    return 'empty';
                                }
                            }, i, post_selector);
                        commentContents.push(postComment)
                    
                } 
                // console.log(commentContents);
                // return comments
                    
                } catch (error) {
                    logToFile(error.message, '../../../../logs/FacebookusersError.log')
                    return console.log(error.message)
                }
                
        // Scraping for post commentor ids(Profile) of a given post using postIds //     
            try {
                let selector= "._2b05"; 
                let post_length = await page.evaluate((sel) => {
                    let elements = Array.from(document.querySelectorAll(sel));
                    return elements.length;
                }, selector);
                for(let i=0; i< post_length; i++){
                    var id = await page.evaluate((l, sel) => {
                        let elements= Array.from(document.querySelectorAll(sel))
                        let anchor  = elements[l].getElementsByTagName('a')[0];
                        if(anchor){
                            return anchor.href;
                        }else{
                            return 'empty';
                        }
                            }, i, selector);
                        ids.push(id)
                    
                }         
                // console.log(ids);
                // return ids
                    
                } catch (error) {
                    logToFile(error.message, '../../../../logs/FacebookusersError.log')
                    return console.log(error.message)
                }
                                
        // Scraping for post commentor names of a given post using postIds //        
            try {
                let selector= "._2b05"; 
                let post_length = await page.evaluate((sel) => {
                    let elements = Array.from(document.querySelectorAll(sel));
                    return elements.length;
                }, selector);
                for(let i=0; i< post_length; i++){
                    var name = await page.evaluate((l, sel) => {
                                let elements= Array.from(document.querySelectorAll(sel))
                                let anchor  = elements[l]
                                if(anchor){
                                    return anchor.innerText;
                                }else{
                                    return 'empty';
                                }
                            }, i, selector);
                        names.push(name)
                    
                }
                // console.log(names);
                
                    
                } catch (error) {
                    logToFile(error.message, '../../../../logs/FacebookusersError.log')
                    return console.log(error.message)
                } 
               
        // Scraping for number of likes of a given post using post Ids //        
            try {
                let selector= "._1g06";             
                var like = await page.evaluate((sel) => {
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
                    logToFile(error.message, '../../../../logs/FacebookusersError.log')
                    return console.log(error.message)
                }
                
        // Scraping for the number of shares of a given post using post Ids
            try {
                let selector = "._43lx";            
                var share = await page.evaluate((sel) => {
                            let elements = []
                            elements= Array.from(document.querySelectorAll(sel))
                            let anchor  = elements[0]
                            if(anchor){
                                return anchor.innerText;
                            }else{
                                return '0 shares';
                            }
                        }, selector);
                } catch (error) {
                    logToFile(error.message, '../../../../logs/FacebookusersError.log')
                    return console.log(error.message)
                }
                
        // Scraping for time of post using post Link //
            try {
                let selector= "._52jc"; 
                var timeStamp = await page.evaluate((sel) => {
                            let elements =[]
                            elements= Array.from(document.querySelectorAll(sel))
                            let anchor  = elements[0]
                            if(anchor){
                                return anchor.innerText;
                            }else{
                                return 'empty';
                            }
                        }, selector);
                } catch (error) {
                    logToFile(error.message, '../../../../logs/FacebookusersError.log')
                    return console.log(error.message)
                }
                // console.log(timeStamp);
                // console.log("timeStamp collected");

                
            for (let j = 0; j < names.length; j++) {
                comments.push({
                    commentContent: commentContents[j],
                    commenterName: names[j],
                    commentorId: ids[j],
                    reporting: {
                        is_reported: false,
                        reporting_date: date,
                        reported_by: ""
                    },
                })
            }

        //  console.log(comments);
        var date = new Date().toLocaleString()
            posts.push ({
                    postId: postLinks[i],
                    postContent: postContent,
                    numberOfLikes: like,
                    numberOfShares: share,
                    timeOfPost: timeStamp,
                    reporting: {
                        is_reported: false,
                        reporting_date: date,
                        reported_by: ""
                    },
                    comments: comments
                })    
        // console.log(posts);
    }

}
    return posts

}
