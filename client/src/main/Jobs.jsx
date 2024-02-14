import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Spinner } from 'flowbite-react'; // Import Spinner component

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true while fetching data
        const response = await axios.get('https://www.arbeitnow.com/api/job-board-api');
        setJobs(response.data.data); // Assuming the data array is directly under the 'data' key
        setLoading(false); // Set loading to false after data fetching is complete
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []);

  return (
  


 
    loading ? (
      
      <Spinner className='flex flex-col mx-auto items-center justify-center' size='xl'/>
    ) : (
      <>
      
        
      <div className="flex flex-wrap justify-center">
        {jobs.map((job, index) => (
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-4 dark:bg-slate-800">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{job.title}</div>
              <p className="text-white-900 text-base">
                {job.tags.map((tag, index) => (
                  <Button key={index} gradientDuoTone='purpleToBlue' outline className='mr-2'>{tag}</Button>
                ))}
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
      </>
    )
  );
}
