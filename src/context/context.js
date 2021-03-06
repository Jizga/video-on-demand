import React, { createContext, useState } from "react";

const Context = createContext();

const AppContextProvider = ({ children }) => {
  // To add variables inside to the different contexts
  const [data, setData] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
  const [isLightTheme, setIsLightTheme] = useState(true);

  return (
    <Context.Provider
      value={{
        data,
        setData,
        watchedList,
        setWatchedList,
        isLightTheme,
        setIsLightTheme,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useAppContext = () => {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }

  return context;
};

export { AppContextProvider, useAppContext };
