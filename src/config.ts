export const corsPrefix =
  process.env.NODE_ENV === "production"
    ? ""
    : "https://cors-anywhere.herokuapp.com/";
export const CLIENT_ID =
  process.env.NODE_ENV === "production"
    ? "NxTWOwoh3zE_GA"
    : process.env.REACT_APP_REDDIT_CLIENT_ID;
export const REDIRECT_URL = `${window.location.protocol}//${window.location.host}/pappr/auth`;
export const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&duration=permanent&state=RANDOM_STRING&scope=read&redirect_uri=${REDIRECT_URL}`;
export const API_URL = `https://oauth.reddit.com/`;
