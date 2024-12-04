import React, { useEffect } from 'react'

function Element({ value }) {
  useEffect(() => {}, [value]);
  
  return (
    <div className='array-circle flex justify-center items-center h-10 w-10 p-2 text-lg rounded-full bg-yellow-500 text-white font-bold font-mono'>{value}</div>
  )
}

export default Element