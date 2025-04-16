const axios=require('axios');
const dotenv=require('dotenv');
dotenv.config();
exports.getCodeforcesContest=async(req,res)=>{
    try{
        const response=await axios.get('https://codeforces.com/api/contest.list');
        // console.log(response.data); // console call (commented out)
        res.send(response.data);
    }catch(err){
        console.error("Error:",err.message);
        res.status(500).json({message:"Failed to fetch Codeforces contests. "+err});
    }
}
// exports.getCodeforcesSolution=async(req,res)=>{
//     try{
//         const playlistId = "PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB";
//         const apiKey = process.env.YOUTUBE_DATA_API;
//         const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${apiKey}`;
//         const response = await axios.get(url);
//         // console.log(response.data.items);
//         res.send(response.data);
//     }catch(err){
//         console.error("Error:",err.message);
//         res.status(500).json({message:"Failed to fetch solution videos. "+err});
//     }
// }
exports.getCodeforcesSolution = async (req, res) => {
    try {
        const playlistId = "PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB";
        const apiKey = process.env.YOUTUBE_DATA_API;
        let allItems = [];
        let nextPageToken = null;

        do {
            const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
            const response = await axios.get(url);

            if (response.data.items) {
                allItems = allItems.concat(response.data.items);  // Collect all items
            }

            nextPageToken = response.data.nextPageToken || null;  // Move to the next page if exists

        } while (nextPageToken);

        res.status(200).json({
            success: true,
            totalItems: allItems.length,
            items: allItems
        });

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ message: "Failed to fetch solution videos. " + err.message });
    }
};