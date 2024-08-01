import Cookies from "js-cookie";

class CookieManager {

  // Set a cookie with SameSite and other options
  setCookie(key, value, options = {}) {
    if (typeof value === "object") {
      // Convert object to JSON string
      const jsonValue = JSON.stringify(value);
      Cookies.set(key, jsonValue, {secure: true, sameSite: 'Lax'});
    } else {
      Cookies.set(key, value, {secure: true, sameSite: 'Lax'});
    }
  }

  // Get a cookie value
  getCookie(key) {
    const cookieValue = Cookies.get(key);
    if (cookieValue !== undefined && cookieValue !== null) {
      try {
        return JSON.parse(cookieValue); // Attempt to parse JSON string
      } catch (error) {
        return cookieValue; // Return as-is if not JSON
      }
    }
    return undefined;
  }

  // Remove a cookie
  removeCookie(key) {
    Cookies.remove(key);
  }

  // Logout and remove specific cookies
  logout() {
    this.removeCookie("token");
    this.removeCookie("user");
  }

  // Remove all cookies
  removeAllCookies() {
    const cookies = Cookies.get();
    for (const cookie in cookies) {
      Cookies.remove(cookie);
    }
  }
}

export default CookieManager;
