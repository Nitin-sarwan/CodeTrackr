import React, { useEffect, useState } from 'react'
import './LeetCode.css';

const LeetCode = () => {
    const [leetcodeContest, setLeetcodeContest] = useState([]);
    const [pastContest,setPastContest]=useState([]);
     const [currentPage,setCurrentPage]=useState(1);
    
        const handlePageChange = (n) => {
            setCurrentPage(n + 1);
        }
        const goToPrev = () => {
            setCurrentPage((prev) => prev - 1);
        }
        const goToNext = () => {
            setCurrentPage((prev) => prev + 1);
        }
        


    const getContest = async () => {
        const res = await fetch("http://localhost:4000/api/LeetCode/Contest");
        const data = await res.json();
        if (data.status === "OK") {
            data.contests.forEach((contest)=>{
                const [day, month, yearAndTime] = contest.time.split('/');
                const [year, time] = yearAndTime.split(', ');

                // Convert to a valid date string format (MM/DD/YYYY HH:MM:SS AM/PM)
                const formattedDate = `${month}/${day}/${year}, ${time}`;
                // Now parse the date correctly
                const contestTime = new Date(formattedDate);
                contest[time]=formattedDate;
                if(contestTime>new Date()){
                    setLeetcodeContest((prev)=>[...prev,contest]);
                }
                else{
                    setPastContest((prev)=>[...prev,contest]);
                }
            })
        }
    }
    const getLeetCodeSolution=async()=>{
        const res=await fetch("http://localhost:4000/api/LeetCode/Solution");
        const data=await res.json();
        var find=0;
        if(data.items && data.items.length){
            const updatedPastContest=pastContest.map((contest)=>{
                contest.solutionUrl=[];
                const solution=data.items.find((item)=>{
                    const titleName=item.snippet.title.split("|")[0].trim();
                    const title=titleName.split(" ").splice(1).join(" ");
                    if(title === contest.name){
                        contest.solutionUrl=`https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`;
                    }  
                })
            });
    }
    }
    useEffect(() => {
        getContest();
    }, [])
    useEffect(()=>{
        if(pastContest.length>0){
            getLeetCodeSolution();
        }
    },[pastContest])


    const PAGE_SIZE = 10;
    const totalPage = Math.ceil(pastContest.length / PAGE_SIZE);
    const start_page = (currentPage - 1) * PAGE_SIZE;
    const end_page = currentPage * PAGE_SIZE;

    function convertTomiliSeconds(dateStr) {
        const [datePart, timePart] = dateStr.split(', ');
        const [day, month, year] = datePart.split('/').map(Number);

        const date = new Date(`${year}-${month}-${day} ${timePart}`);
        return date.getTime();
    }
    const calculate = (time) => {
        const timeDifference=convertTomiliSeconds(time)-new Date(Date.now()).getTime();
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);
        return `${hours} h ${minutes} m ${seconds} s`;
    }
    const Name=(name)=>{
        return(name.split(" ").join("-"));
    }
    return (
        <div className="main-container" >
            <div className="icon">
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="" />
            <h1>LeetCode contest</h1>
            </div>
            <div className="container">
                <div className="upComing-contest">
                    <h2>Upcoming contest</h2>
                    <div className="contest">
                        <div className="titles">
                            <h3>Contest Name</h3>
                            <h3>Start Time</h3>
                            <h3>Duration</h3>
                            <h3>Link</h3>
                        </div>
                        {
                            leetcodeContest.length ? (leetcodeContest.map((contest, index) => {
                                return (
                                    <div className="card" key={index}>
                                        <h3>{contest.name}</h3>
                                        <p> {contest.time}</p>
                                        <p> 2 hours</p>
                                        <p>
                                           starts In: <br/> {convertTomiliSeconds(contest.time)-new Date(Date.now()).getTime()>0?calculate(contest.time):"Started"}
                                        </p>
                                        <a href={`https://leetcode.com/contest/LeetCode${Name(contest.name)}`} target="_blank" rel="noreferrer">Link</a>
                                    </div>
                                )
                            })
                            ) : <h2>No upcoming contest</h2>
                        }
                    </div>
                </div>
                <div className="pastContest">
                    <h2>past contest</h2>
                    <div className="contest">
                        <div className="past-titles">
                            <h3>Contest Name</h3>
                            <h3>Start Time</h3>
                            <h3>Duration</h3>
                            <h3>Link</h3>
                            <h3>Solution</h3>
                        </div>
                        {
                            pastContest.length ? (pastContest.slice(start_page, end_page).map((contest, index) => {
                                return (
                                    <div className="past-card" key={index}>
                                        <h3>{contest.name}</h3>
                                        <p> {contest.time}</p>
                                        <p> {2} hours</p>
                                        <p>{`Finished!`}</p>
                                        <a href={`https://leetcode.com/contest/${Name(contest.name)}`} target="_blank" rel="noreferrer">Link</a>
                                        <a href={contest.solutionUrl} target="_blank" rel="noreferrer">
                                            {contest.solutionUrl.length ? <img className="img-logo" src="https://cdn.iconscout.com/icon/free/png-256/free-youtube-logo-icon-download-in-svg-png-gif-file-formats--social-media-70-flat-icons-color-pack-logos-432560.png" alt=""/>:""}
                                        </a>
                                    </div>
                                )
                            })) : <h2>No past contest</h2>
                        }
                    </div>
                    <div className="pagination flex items-center space-x-2 mt-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={goToPrev}
                            className="emoji px-3 py-1 rounded bg-gray-200 text-gray-700"
                        >
                            ⬅
                        </button>

                        {(() => {
                            const pages = [];
                            const maxPagesToShow = 5;

                            if (totalPage <= maxPagesToShow) {
                                for (let i = 1; i <= totalPage; i++) {
                                    pages.push(i);
                                }
                            } else {
                                const startPage = Math.max(1, currentPage - 1);
                                const endPage = Math.min(totalPage, currentPage + 1);

                                if (startPage > 4) pages.push(1, '...');
                                for (let i = startPage; i <= endPage; i++) {
                                    pages.push(i);
                                }
                                if (endPage < totalPage - 1) pages.push('...', totalPage);
                            }

                            return pages.map((page, index) => (
                                typeof page === 'number' ? (
                                    <span
                                        key={index}
                                        onClick={() => handlePageChange(page)}
                                        className={`page-number px-3 py-1 rounded cursor-pointer ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        {page}
                                    </span>
                                ) : (
                                    <span key={index} className="text-gray-500">...</span>
                                )
                            ));
                        })()}

                        <button
                            disabled={currentPage === totalPage}
                            onClick={goToNext}
                            className="emoji px-3 py-1 rounded bg-gray-200 text-gray-700"
                        >
                            ➡
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default LeetCode
