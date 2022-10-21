import React, {useState} from 'react';

const Context = React.createContext('english');

export const MainStore = ({children}) => {
  const [allData, setAllData] = useState('hi')
  
    return (
      <Context.Provider
        value={{ allData, setAllData }}
      >
        {children}
      </Context.Provider>
    );
  }


export default Context;