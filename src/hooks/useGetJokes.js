import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetJokes = (numJokesToGet = 5) => {
  const [jokes, setJokes] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        let fetchedJokes = [];
        while (fetchedJokes.length < numJokesToGet) {
          const response = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          fetchedJokes.push({ ...response.data, votes: 0 });
        }
        setJokes(fetchedJokes);
      } catch (error) {
        console.error('Error fetching jokes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      fetchJokes();
    }
  }, [isLoading, numJokesToGet]);

  const refetchJokes = () => {
    setIsLoading(true);
  };

  return [jokes, isLoading, refetchJokes];
};

export default useGetJokes;
