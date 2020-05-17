import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    useHistory,
    Redirect
} from "react-router-dom";
import {parse, stringify} from 'qs'
import './App.css';

const corsPrefix = process.env.NODE_ENV === 'production' ? '' : 'https://cors-anywhere.herokuapp.com/'
const CLIENT_ID = process.env.NODE_ENV === 'production' ? 'NxTWOwoh3zE_GA' : process.env.REACT_APP_REDDIT_CLIENT_ID
const REDIRECT_URL = process.env.NODE_ENV === 'production' ? 'https://mackattack3k.github.io/pappr/auth' : 'http://localhost:3000/auth'
const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&duration=permanent&state=RANDOM_STRING&scope=read&redirect_uri=${REDIRECT_URL}`
const API_URL = `https://oauth.reddit.com/`

interface Post {
    data: {
        url: string;
    }
}

const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomValueFromArray = (array: any[]) => {
    const pos = randomIntFromInterval(0, array.length - 1)
    return array[pos]
}

const isDev = process.env.NODE_ENV === 'development'
const devLog = (l: any) => {
    if (!isDev) {
        return
    }
    console.log(l)
}


const fetchImage = async (fromSubreddit: string, accessToken: string) => {
    try {
        const r = await fetch(`${API_URL}r/${fromSubreddit}/hot`, {
            headers: {
                Authorization: `bearer ${accessToken}`,
                'User-Agent': `Web:${CLIENT_ID}:0.0.1 (by /u/mackattack3k)`
            }
        });
        const jsonR = await JSON.parse(await r.text());
        devLog({jsonResponse: jsonR})
        const posts = jsonR.data.children as Post[]
        devLog({allPosts: posts})
        const images = posts.map(post => post.data.url)
        const randomImage = randomValueFromArray(images)
        devLog({randomImage})
        return randomImage;
    } catch (e) {
        return 'nodata';
    }
}

const SUBS = ['earthporn', 'wallpapers']

function useHot() {
    const [image, setFoundImage] = useState<string>()
    const [access] = useLocalStorage('access', 'loading');
    const selectedSubreddit = randomValueFromArray(SUBS)
    devLog(`Selected random subreddit ${selectedSubreddit} from ${SUBS}`)
    useEffect(() => {
        if (!access) {
            return
        }
        const fetchHot = async () => {
            devLog('useEffect start fetch')
            devLog(access)
            const accessToken = access.access_token
            const image = await fetchImage(selectedSubreddit, accessToken)
            setFoundImage(image)
            devLog('useEffect done')
        }
        fetchHot().catch(devLog)
    }, [selectedSubreddit, access])
    return {
        image,
        isLoading: !image
    }
}

function useLocalStorage(key: string, initialValue: string) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            if (!item) {
                return null
            }
            return JSON.parse(item);
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: ((s: string) => void) | string) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

function Image() {
    const hotImage = useHot()
    if (hotImage.isLoading) {
        return <div className="loading"><h1>Loading</h1></div>
    }
    if (hotImage.image === 'nodata') {
        return <div className="loading"><h1>Error getting image</h1></div>
    }
    return <img className="bg"
                src={hotImage.image}
                alt="Wallpaper" />
}

const Home = () => {
    const [access] = useLocalStorage('access', 'loading');
    devLog({access, authUrl})
    if (!access) {
        return <div>Authenticate with your reddit account to fetch images. We only require read
            access
            to posts.<a href={authUrl}>Log in here</a></div>
    }
    return <Image />}

const Auth = () => {
    let location = useLocation();
    const history = useHistory();
    const {code} = parse(location.search)
    const getBearer = async () => {
        devLog(`Fetching bearer with code ${code}`)
        const fetchBearer = await fetch(`${corsPrefix}https://www.reddit.com/api/v1/access_token`, {
            method: 'post',
            headers: {
                Authorization: `Basic ${btoa(CLIENT_ID + ":")}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: REDIRECT_URL
            })
        })
        const parsedResponse = await fetchBearer.json()
        devLog(parsedResponse);
        window.localStorage.setItem('access', JSON.stringify(parsedResponse));
        history.push('/')
    }
    getBearer()
    return <div>Getting bearer</div>
}

function App() {

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/auth" component={Auth} />
                    <Route path="/" component={Home} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
