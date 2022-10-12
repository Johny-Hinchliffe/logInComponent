import {createContext, useState} from 'react';

const UserContext = createContext({user:{}})


export const UserStore = ({children}) => {
    const [user, setUser] = useState({user:{}})

    return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>)
}


export default UserContext
