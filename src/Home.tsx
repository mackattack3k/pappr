import React from "react";
import { devLog } from "./utils";
import Background from "./Background";
import { authUrl } from "./config";

const Home = () => {
  const access = window.localStorage.getItem("access");
  devLog({ access, authUrl });
  if (!access) {
    return (
      <div className="home">
        <div>
          Authenticate with your reddit account to fetch images. We only require
          read access to posts.
        </div>
        <div>
          <a className="link" href={authUrl}>
            Log in with your reddit account
          </a>
        </div>
      </div>
    );
  }
  return <Background />;
};

export default Home;
