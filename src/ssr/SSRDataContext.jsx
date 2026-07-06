import React, { createContext, useContext } from "react";

const SSRDataContext = createContext({});

export function SSRDataProvider({ children, value }) {
  return (
    <SSRDataContext.Provider value={value || {}}>
      {children}
    </SSRDataContext.Provider>
  );
}

export function useSSRData() {
  return useContext(SSRDataContext);
}
