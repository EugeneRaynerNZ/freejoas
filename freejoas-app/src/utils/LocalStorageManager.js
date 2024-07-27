import logger from "./Logger";

// localStorageManager.js
const KEY_USER = 'users';
const KEY_FREEJOA = 'freejoas';
const KEY_RECENT_VISITED = 'recentVisited';

const LocalStorageManager = {
  saveUserData: (userId, dataKey, data) => {
    try{
        // get user data 
        let userData = localStorage.getItem(userId);  
        // if there is no user data, create an empty object
        if (!userData) {
            userData = {};
        }else{
            userData = JSON.parse(userData);
        }
        // add the data to the user data
        userData[dataKey] = data;
    
        // save the user data
        localStorage.setItem(userId, JSON.stringify(userData));
    }catch(error){
      logger.error('Error saving userData to localStorage:', error);
    }

  },

  getUserData: (userId, dataKey) => {
    try{
        // get user data
        let userData = JSON.parse(localStorage.getItem(userId)) || {};  // if there is no user data, create an empty object
        // get the data from the user data
        return userData[dataKey];
    }catch(error){
      logger.error('Error getting userData from localStorage:', error);
    }
  },

  clearAllData: () => {
    try{
        // clear all data from localStorage
        localStorage.clear();
    }catch(error){
      logger.error('Error clearing all data from localStorage:', error);
    }
  }
 
};


export default LocalStorageManager;
export {
  KEY_USER,
  KEY_FREEJOA,
  KEY_RECENT_VISITED
};