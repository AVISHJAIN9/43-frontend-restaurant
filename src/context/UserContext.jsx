/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userAuth, setUserAuth] = useState(() => {
    try {
      const userInStorage = localStorage.getItem("user");
      return userInStorage ? JSON.parse(userInStorage) : {};
    } catch {
      return {};
    }
  });

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserContext.Provider>
  );
}