import React, { createContext, useEffect, useState } from 'react';

// Create and export context
export const UACobj = createContext();

// Create and export the provider component
function UserAuthorContext2({ children }) {
  const [currentUser, setcurrentUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileImageUrl: '',
    role: ''
  });
    //for displaying the local storage to show details on refreshing page
  useEffect(()=>{
    const userInStorage=localStorage.getItem('currentuser');
    if(userInStorage){
      setcurrentUser(JSON.parse(userInStorage))
    }
  },[])

  return (
    <UACobj.Provider value={{ currentUser, setcurrentUser }}>
      {children}
    </UACobj.Provider>
  );
}

export default UserAuthorContext2
