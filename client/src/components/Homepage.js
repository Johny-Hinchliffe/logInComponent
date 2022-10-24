import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';

const Homepage = () => {
  // Could have something here to check for the time when the accesstoken expires
  // and then call the refresh_token endpoint to get a new accesstoken automatically
  const [user] = useContext(UserContext);
  const [content, setContent] = useState('You need to login');

  useEffect(() => {
    async function fetchProtected() {
      const result = await (await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${user.accesstoken}`,
        },
      })).json();
      console.log(result.data)
      if (result.data) setContent(result.data)
    }
    fetchProtected();
  }, [user])


  const UnauthHomePage = 'You are not logged in'





  return (
    <div>{content}</div>






  )
}

export default Homepage