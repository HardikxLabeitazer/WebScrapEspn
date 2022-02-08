const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

const request = require('request');
const cheerio = require('cheerio');

request(url,cb);

function cb(err,response,html){
    if(err){
        console.error(err);
    }
    else{
        extractLink(html);
    }
}

function extractLink(html){
    let $ = cheerio.load(html);
    let anchorElem  = $('a[data-hover="View All Results"]')


    let link = anchorElem.attr("href");
    
    let fulllink = "https://www.espncricinfo.com"+link;
    console.log(fulllink);


    getAllMatchLink(fulllink);
}

function getAllMatchLink(url){
    request(url,function(error,reponse,html){
        if(error){
            console.log(error);
        }
        else{
            extractAllLink(html);
        }
    })
}

function extractAllLink(html){
    let $ = cheerio.load(html);
    let anchEl = $('a[data-hover="Scorecard"]')
    for(let i = 0;i<anchEl.length;i++){
        let lk = $(anchEl[i]).attr("href");
        let fulllink = "https://www.espncricinfo.com"+ lk;
        console.log(fulllink);
        if(i==anchEl.length-2){
            getdetails(fulllink);
        }
    }
    
}

function getdetails(html){
    let $ = cheerio.load(html);
     let description = $(".header-info .description")
     let destring = description.text().split(',');
     console.log(destring);
}

