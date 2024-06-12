import React, { createContext, useContext, useState } from 'react';


const RecentVisitedContext = createContext();

export const RecentVisitedProvider = ({ children }) => {
  const [recentVisited, setRecentVisited] = useState([]);

  return (
    <RecentVisitedContext.Provider value={{ recentVisited, setRecentVisited }}>
      {children}
    </RecentVisitedContext.Provider>
  );
};

export const useRecentVisited = () => useContext(RecentVisitedContext);