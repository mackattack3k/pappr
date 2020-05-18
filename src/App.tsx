import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { parse, stringify } from "qs";
import "./App.css";
import { devLog } from "./utils";
import { CLIENT_ID, corsPrefix, REDIRECT_URL } from "./config";
import Home from "./Home";

export const updateBearer = async () => {
  const access = window.localStorage.getItem("access");
  if (!access) {
    devLog("TODO: Clear access since we failed to get it. Need reAuth");
    return;
  }
  const { refresh_token } = JSON.parse(access);
  const fetchUpdate = await fetch(
    `${corsPrefix}https://www.reddit.com/api/v1/access_token`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(CLIENT_ID + ":")}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: stringify({
        grant_type: "refresh_token",
        refresh_token,
      }),
    }
  );
  const parsedResponse = await fetchUpdate.json();
  const expiryDate = new Date();
  expiryDate.setSeconds(expiryDate.getSeconds() + parsedResponse.expires_in);
  window.localStorage.setItem(
    "access",
    JSON.stringify({
      ...parsedResponse,
      refresh_token,
      expiryDate,
    })
  );
};

const Auth = () => {
  let location = useLocation();
  const history = useHistory();
  const { code } = parse(location.search);
  const getBearer = async () => {
    devLog(`Fetching bearer with code ${code}`);
    const fetchBearer = await fetch(
      `${corsPrefix}https://www.reddit.com/api/v1/access_token`,
      {
        method: "post",
        headers: {
          Authorization: `Basic ${btoa(CLIENT_ID + ":")}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: stringify({
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URL,
        }),
      }
    );
    const parsedResponse = await fetchBearer.json();
    devLog(`Get bearer response ${parsedResponse}`);
    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + parsedResponse.expires_in);
    window.localStorage.setItem(
      "access",
      JSON.stringify({
        ...parsedResponse,
        expiryDate,
      })
    );
    history.push("/");
  };
  getBearer();
  return <div>Getting bearer</div>;
};

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
