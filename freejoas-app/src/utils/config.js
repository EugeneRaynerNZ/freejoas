
const Environment = {
    REACT_APP_NODE_ENV: process.env.REACT_APP_NODE_ENV,
   // google map related
   REACT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
   REACT_APP_GOOGLE_MAPS_ID: process.env.REACT_APP_GOOGLE_MAPS_ID,

   // backend related
   REACT_APP_BACKEND_BASE_URL: process.env.REACT_APP_BACKEND_BASE_URL,
}

const KEYS ={
    KEY_TOKEN: 'token',
    KEY_USER: 'user',
    KEY_FREEJOAS: 'freejoas',
    KEY_RECENT_VIEWED: 'recent_viewed',
    KEY_USER_LOCATION: 'user_location',
    KEY_SELECTED_ITEM: 'selected_item',
}

export { Environment, KEYS};