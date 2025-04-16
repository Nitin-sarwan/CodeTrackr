import React from 'react'
import './Filter.css'

const Filter = ({ onFilterChange }) => {
  const handleSelect = (e) => {
    onFilterChange(e.target.value);
  }

  return (
    <div className="filter">
      <select onChange={handleSelect}>
        <option value="all">All</option>
        <option value="codeforces">Codeforces</option>
        <option value="leetcode">LeetCode</option>
       
      </select>
    </div>
  )
}

export default Filter
