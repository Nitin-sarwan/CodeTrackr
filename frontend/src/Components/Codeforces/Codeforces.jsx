import React, { useEffect, useState } from 'react'
import './Codeforces.css';

const Codeforces = () => {
    const [upcomingContest, setUpcomingContest] = useState([]);
    const [pastContest, setPastContest] = useState([]);
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
        const res=await fetch("http://localhost:4000/api/codeforces/contest");
        const data = await res.json();
       const upcoming=[];
       const past=[]
        if (data.status === "OK") {
            data.result.forEach((contest)=>{
                if(contest.phase==="BEFORE"){
                    // setUpcomingContest((prev)=>[...prev,contest]);
                    upcoming.push(contest);
                }
                else{
                    // setPastContest((prev)=>[...prev,contest]);
                    past.push(contest);
                }
            })
            setUpcomingContest(upcoming);
            setPastContest(past);
        }
    }
    
    // const getcodeforcesSolution = async () => {
    //     try {
    //       const res = await fetch("http://localhost:4000/api/codeforces/solution");
    //       const data = await res.json();
    //       if (data.items && data.items.length > 0) {
    //         const updatedPastContest = pastContest.map((contest) => {
    //             contest.solutionUrl = [];
    //           const matchedItem = data.items.find((item) => {
    //             const titleName = item.snippet.title.split("|")[0].trim();
    //             const publishedDate = new Date(item.snippet.publishedAt);
    //             const contestDate = new Date(contest.startTimeSeconds * 1000);
    //             console.log(contestDate, publishedDate);
    //             return (
    //               titleName === contest.name &&
    //               publishedDate.getFullYear() === contestDate.getFullYear() &&
    //               publishedDate.getMonth() === contestDate.getMonth() &&
    //               publishedDate.getDate() === contestDate.getDate()
    //             );
    //           });
    //             // if (matchedItem) {
    //             //     contest.solutionUrl = `https://www.youtube.com/watch?v=${matchedItem.snippet.resourceId.videoId}`;
    //             //     console.log(contest);
    //             // }
               
    //         });
    //         // console.log(updatedPastContest);
    //         // setPastContest(updatedPastContest);
    //       }
    //     } catch (err) {
    //       console.error("Error:", err.message);
    //     }
    //   };
      
    useEffect(() => {
        getContest();
    }, [])
    // useEffect(()=>{
    //     if(pastContest.length > 0){
    //         getcodeforcesSolution();
    //     }
    // },[pastContest]);



    const PAGE_SIZE=10;
    const totalPage=Math.ceil(pastContest.length/PAGE_SIZE);
    const start_page=(currentPage-1)*PAGE_SIZE;
    const end_page=currentPage*PAGE_SIZE;

    const calculate=(time)=>{
        const timeDifference = time - Date.now();
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);
        return `${hours} h ${minutes} m ${seconds} s`;
    }
    

  return (
      <div className="main-container" >
        <div className="icon">
          <img src="https://cdn.iconscout.com/icon/free/png-256/free-code-forces-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-2-pack-logos-icons-2944796.png?f=webp&w=256" alt="" />
              <h1> Codeforces contest</h1>
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
                upcomingContest.length?(upcomingContest.map((contest,index) => {
                    return (
                        <div className="card" key={index}>
                            <h3>{contest.name}</h3>
                            <p> {new Date(contest.startTimeSeconds * 1000).toLocaleString()}</p>
                            <p> {contest.durationSeconds / 3600} hours</p>
                            <p>
                               Starts In: <br /> {new Date(contest.startTimeSeconds * 1000).getTime() - Date.now() > 0 ? calculate(new Date(contest.startTimeSeconds * 1000).getTime()) : "Contest Started!"}
                            </p>
                            <a href={`https://codeforces.com/contest/${contest.id}`} target="_blank" rel="noreferrer">Link</a>
                        </div>
                     )
                    })
                ):<h2>No upcoming contest</h2>
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
                pastContest.length?(pastContest.slice(start_page,end_page).map((contest,index) => {
                    return (
                        <div className="past-card" key={index}>
                            <h3>{contest.name}</h3>
                            <p> {new Date(contest.startTimeSeconds * 1000).toLocaleString()}</p>
                            <p> {contest.durationSeconds / 3600} hours</p>
                            <p>{`Finished!`}</p>
                            <a href={`https://codeforces.com/contest/${contest.id}`} target="_blank" rel="noreferrer">Link</a>
                            <a href={contest.solutionUrl}>{contest.solutionUrl}</a>
                        </div>
                     )
                    })):<h2>No past contest</h2>
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

export default Codeforces
