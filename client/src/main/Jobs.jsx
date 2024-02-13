import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button} from 'flowbite-react'

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.arbeitnow.com/api/job-board-api');
        setJobs(response.data.data); // Assuming the data array is directly under the 'data' key
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
    {jobs.map((job, index) => (
      <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-4 dark:bg-slate-800">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{job.title}</div>
          <p className="text-white-900 text-base">
            <Button gradientDuoTone='purpleToBlue' outline>{job.tags}</Button>
            <strong>Company:</strong> {job.company_name}<br />
            <strong>Location:</strong> {job.location}<br />
            
          </p>
        </div>
        <div className="px-6 py-4">
        <a href={job.url} className="text-blue-500 hover:text-blue-700" rel="noopener noreferrer" target="_blank">More Info</a>

        </div>
      </div>
    ))}
  </div>
  );
}
