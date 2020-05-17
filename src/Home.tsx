import React from "react";
import {devLog} from "./utils";
import {useLocalStorage} from "./useLocalStorage";
import Background from "./Background";
import {authUrl} from "./config";

const Home = () => {
    const [access] = useLocalStorage('access', 'loading');
    devLog({access, authUrl})
    if (!access) {
        return <div>Authenticate with your reddit account to fetch images. We only require read
            access
            to posts.<a href={authUrl}>Log in here</a></div>
    }
    return <Background />
}

export default Home
