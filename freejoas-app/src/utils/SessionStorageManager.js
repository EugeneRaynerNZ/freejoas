function SessionStorageManager() {
    // set item in session storage
    const setItem = (key, value) => {
        try {
            // check if value is not an object
            if (typeof value !== 'object') {
                sessionStorage.setItem(key, value);
                return;
            }
            // serialize value if it is an object
            const serializedValue = JSON.stringify(value);
            sessionStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error saving ${key} to sessionStorage`, error);
        }
    }

    // get item from session storage
    const getItem = (key) => {
        try {
            const value = sessionStorage.getItem(key);
            // check if value is not an object
            if (typeof value !== 'string') {
                return value;
            }
            // parse value if it is an object
            return JSON.parse(value);
        } catch (error) {
            console.error(`Error getting ${key} from sessionStorage`, error);
        }
    }

    // remove item from session storage
    const removeItem = (key) => {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing ${key} from sessionStorage`, error);
        }
    }

    // clear session storage
    const clear = () => {
        try {
            sessionStorage.clear();
        } catch (error) {
            console.error('Error clearing sessionStorage', error);
        }
    }

    return {
        setItem,
        getItem,
        removeItem,
        clear
    };
}

const USERS = 'users';
const FREEJOAS = 'freejoas';

export default SessionStorageManager;
export {
    USERS,
    FREEJOAS
}