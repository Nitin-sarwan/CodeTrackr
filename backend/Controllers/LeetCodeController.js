const axios = require('axios');

exports.getLeetCodeContest = async (req, res) => {
    try {
        const response = await axios.post('https://leetcode.com/graphql',
            {
                operationName: "allContests",
                variables: {},
                query: `query allContests {  
                    allContests {    
                        title    
                        titleSlug    
                        startTime    
                        duration    
                        originStartTime  
                    }  
                }`
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Referer': 'https://leetcode.com/contest/',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
                }
            }
        );
        // console.log(response.data.data); // console call

        const contests = response.data.data.allContests.map(contest => ({
            name: contest.title,
            time: new Date(contest.startTime * 1000).toLocaleString(),
            link: `https://leetcode.com/contest/${contest.titleSlug}`
        }));

        res.json({ status: 'OK', contests });

    } catch (error) {
        console.error("Error:", error.message); // console call
        res.status(500).json({ message: "Failed to fetch LeetCode contests. " + error.message });
    }
};

exports.getLeetCodeSolution=async(req,res)=>{
    try{
        const playlistId = "PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr";
        const apiKey = process.env.YOUTUBE_DATA_API;
        let allItems = [];
        let nextPageToken = null;
        do{
            const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=25&key=${apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
        const response = await axios.get(url);
        if(response.data.items){
            allItems=allItems.concat(response.data.items);
        }
        nextPageToken=response.data.nextPageToken || null;
      }while(nextPageToken);
       console.log(allItems);
        res.status(200).json({
            success:true,
            totalItems:allItems.length,
            items:allItems
        });
    }catch(err){
        console.error("Error:",err.message);
        res.status(500).json({message:"Failed to fetch solution videos. "+err});
    }
}