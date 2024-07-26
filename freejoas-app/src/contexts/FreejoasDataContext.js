import React, { useEffect, useState, createContext, useContext, useMemo } from "react";
import SessionStorageManager from "../utils/SessionStorageManager";
import { KEYS } from "../utils/config";

const FreejoasDataContext = createContext();

export const FreejoasDataProvider = ({ children }) => {
    const [freejoasData, setFreejoasData] = useState([]);
    


};

export const useFreejoasData = () => {FreejoasDataContext};