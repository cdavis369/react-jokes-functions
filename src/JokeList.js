// JokeList.js
import React, { useState, useEffect } from 'react';
import Joke from './Joke';
import useGetJokes from './hooks/useGetJokes';
import './JokeList.css';

const JokeList = () => {
  const [response, isLoading, refetchJokes] = useGetJokes();
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    setJokes(response);
  }, [response]);

  const vote = (id, delta) => {
    const updatedJokes = jokes.map(joke =>
      joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
    );
    setJokes(updatedJokes);
  };
  if (isLoading) {
      return (
        <div className="loading">
          <i className="fas fa-4x fa-spinner fa-spin" />
        </div>
      );
  }
  return (
    <div className="JokeList">
      <button className="JokeList-getmore" onClick={refetchJokes}>
        Get More Jokes
      </button>
      {jokes && jokes.map(joke => (
        <Joke key={joke.id} id={joke.id} vote={vote} votes={joke.votes} text={joke.joke} />
      ))}
    </div>
  );
};

export default JokeList;
