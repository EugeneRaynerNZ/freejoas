import Cookies from "js-cookie";

function CookieManager() {

    const setCookie = (key, value) => {
        //check if the value is an object
        if (typeof value === 'object') {
            //set the object as a JSON string
            const jsonValue = JSON.stringify(value);
            // console.log("json value: "+jsonValue);
            Cookies.set(key, jsonValue);
        } else {
            //set the value directly if it is not an object
            Cookies.set(key, value);
        }
    };

    const getCookie = (key) => {
       const cookieValue = Cookies.get(key);

       //check if the cookie value is a JSON string
         if(cookieValue !== undefined && cookieValue !== null){
              try {
                //parse the JSON string to an object
                return JSON.parse(cookieValue);
              } catch (error) {
                //return the value directly if it is not a JSON string
                return cookieValue;
              }
         }
         
        return undefined;
    };

    const removeCookie = (key) => {
        Cookies.remove(key);
    };

    const logout = () => {
        removeCookie('token');
        removeCookie('user');
    };

    const removeAllCookies = () => {
        const cookies = Cookies.get();
        for (const cookie in cookies) {
            Cookies.remove(cookie);
        }
    };

    return { setCookie, getCookie, removeCookie, logout, removeAllCookies};
}

export default CookieManager;