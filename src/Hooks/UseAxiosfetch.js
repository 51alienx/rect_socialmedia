import { useState, useEffect } from 'react';
import axios from 'axios';

const UseAxiosfetch = (dataUrl) => {
  // State variables to manage data, fetch errors, and loading state
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Variable to track whether the component is mounted or not
    let isMounted = true;

    // Create a cancel token to cancel the Axios request if needed
    const source = axios.CancelToken.source();

    // Function to fetch data
    const fetchData = async (url) => {
      // Set loading state to true
      setIsLoading(true);
      
      try {
        // Make an Axios GET request with cancel token
        const response = await axios.get(url, {
          cancelToken: source.token,
        });

        // Check if the component is still mounted before updating the state
        if (isMounted) {
          // Update data and reset fetchError
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        // Handle errors and update fetchError
        if (isMounted) {
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        // Ensure loading state is set to false, regardless of success or failure
        if (isMounted) {
          setTimeout(()=>setIsLoading(false),2000);
        }
      }
    };

    // Call fetchData when the component mounts or dataUrl changes
    fetchData(dataUrl);

    // Cleanup function to run when the component is unmounted
    return () => {
      // Update isMounted to false to prevent state updates on an unmounted component
      isMounted = false;

      // Cancel the Axios request with the provided reason
      source.cancel('Request canceled by cleanup');
    };
  }, [dataUrl]); // Dependency array ensures fetchData is called when dataUrl changes

  // Return the state variables for use in the component
  return { data, fetchError, isLoading };
};

export default UseAxiosfetch;
