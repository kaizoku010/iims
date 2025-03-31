import axios from 'axios';
import React, { useState, useEffect } from 'react';

const SocialMedia = () => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        // Fetch tweets from backend server
        async function fetchTweets() {
          try {
            const response = await axios.get('http://localhost:3001/tweets', {
              params: {
                keywords: 'Uganda', // Replace with your desired keywords
                count: 10 // Number of tweets to retrieven
              }
            });
            setTweets(response.data.statuses || []); // Ensure that  n tweets array is initialized even if response.data.statuses is undefined
            console.log("data point", response.data)
        } catch (error) {
            console.error('Error fetching tweets:', error);
          }
        }
    
        fetchTweets();
      }, []); 


      console.log("twitter state", tweets)
  return (
    <div>
      <h1>Twitter Timeline Test</h1>
      <ul>
        {tweets.map(tweet => (
          <li key={tweet.id}>{tweet.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default SocialMedia;
