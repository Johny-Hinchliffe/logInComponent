import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import {UserContext} from './App'


export const LogOutCallback = async () => {
    const [ user, setUser ] = useContext(UserContext)

    const navigate = useNavigate()
    await fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include', // Needed to include the cookie
    });
    // Clear user from context
    setUser({});
    // Navigate back to startpage
    navigate('/');
    return null
  }