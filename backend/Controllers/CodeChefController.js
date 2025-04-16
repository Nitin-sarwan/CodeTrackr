const axios = require('axios');
const cheerio = require('cheerio');
// const puppeteer=require('puppeteer');
// exports.getCodeChefContest = async (req, res) => {
//     try {
//         const url="https://www.codechef.com/contests";
//         const browser=await puppeteer.launch({headless:false});
//         const page=await browser.newPage();
//         await page.goto(url,{waitUntil:'networkidle2'});
//         await page.waitForSelector(`#future-contests-data`);
//         let upcomingContests=await page.evaluate(()=>{
//             let result=[];
//             let items=document.querySelectorAll(`#future-contests-data tr`);
//             items.forEach((item)=>{
//                 result.push({
//                     code:item.querySelector(`td:nth-child(1)`).innerText,
//                     title: item.querySelector('td:nth-child(2)').innerText,
//                     url: "https://www.codechef.com" + item.querySelector('td:nth-child(2) a').getAttribute('href'),
//                     startDate: item.querySelector('td:nth-child(3)').innerText.substring(0, 11),
//                     startTime: item.querySelector('td:nth-child(3)').innerText.substring(12, 21),
//                     duration: item.querySelector('td:nth-child(4)').innerText,
//                     startsIn: item.querySelector('td:nth-child(5)').innerText
//                 });
//             });
//             return result;
//         })
//         await page.waitForSelector(`#past-contests-data`);
//        let pastContests=await page.evaluate(()=>{
//             let result=[];
//             let items=document.querySelectorAll(`#past-contests-data tr`);
//             items.forEach((item)=>{
//                 result.push({
//                     code:item.querySelector(`td:nth-child(1)`).innerText,
//                     title: item.querySelector('td:nth-child(2)').innerText,
//                     url: "https://www.codechef.com" + item.querySelector('td:nth-child(2) a').getAttribute('href'),
//                     startDate: item.querySelector('td:nth-child(3)').innerText.substring(0, 11),
//                     startTime: item.querySelector('td:nth-child(3)').innerText.substring(12, 21),
//                     duration: item.querySelector('td:nth-child(4)').innerText,
//                     startsIn: item.querySelector('td:nth-child(5)').innerText
//                 });
//             });
//             return result;
//         })
//         await browser.close();
//         console.log("Upcoming Contests:",upcomingContests);
//         console.log("Past Contests:",pastContests);
//         res.json({upcomingContests,pastContests});
//     }catch(err){
//         console.error("Error:",err.message);
//         res.status(500).json({message:"Failed to fetch contest details. "+err});
//     }    
// };


exports.getCodeChefContest = async (req, res) => {
    try {
        const url = "https://www.codechef.com/contests";
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
         
        let upcomingContests = [];
        let pastContests = [];

       
        // Select the parent div containing the contests
        $('div._flex_container_7s2sw_528').each((_, element) => {
            const name = $(element).find('div._data_container_7s2sw_533').eq(0).text().trim();
            const code = $(element).find('div._data_container_7s2sw_533').eq(1).text().trim();
            const startDate = $(element).find('div._data_container_7s2sw_533').eq(2).text().trim().split(' ')[0];
            const startTime = $(element).find('div._data_container_7s2sw_533').eq(2).text().trim().split(' ')[1];
            const duration = $(element).find('div._data_container_7s2sw_533').eq(3).text().trim();
            const startsIn = $(element).find('div._data_container_7s2sw_533').eq(4).text().trim();

            upcomingContests.push({
                code,
                title: name,
                startDate,
                startTime,
                duration,
                startsIn,
                url: `https://www.codechef.com/${code}`
            });
        });

        console.log("Upcoming Contests:", upcomingContests);
           
        // Extract Past Contests
        $('#past-contests-data tr').each((_, element) => {
            const columns = $(element).find('td');
            if (columns.length > 0) {
                pastContests.push({
                    code: $(columns[0]).text().trim(),
                    title: $(columns[1]).text().trim(),
                    url: "https://www.codechef.com" + $(columns[1]).find('a').attr('href'),
                    startDate: $(columns[2]).text().trim().split(' ')[0],
                    startTime: $(columns[2]).text().trim().split(' ')[1],
                    duration: $(columns[3]).text().trim(),
                    startsIn: $(columns[4]).text().trim(),
                });
            }
        });

        // console.log("Upcoming Contests:", upcomingContests);
        // console.log("Past Contests:", pastContests);

        res.json({ upcomingContests, pastContests });

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ message: "Failed to fetch contest details. " + err.message });
    }
};


exports.getCodeChefSolution=async(req,res)=>{
    try{
        const playlistId = "PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr";
        const apiKey = process.env.YOUTUBE_DATA_API;
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=25&key=${apiKey}`;
        const response=await axios.get(url);
        // console.log(response.data.items);
        res.send(response.data);
    }catch(err){
        console.error("Error:",err.message);
        res.status(500).json({message:"Failed to fetch solution videos. "+err});
    }
}
