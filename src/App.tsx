import React, {useEffect, useState} from 'react';
import './App.css';

const corsPrefix = process.env.NODE_ENV === 'production' ? '' : 'https://cors-anywhere.herokuapp.com/'

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


const fetchImage = async (fromSubreddit: string) => {
    try {
        const r = await fetch(`${corsPrefix}https://reddit.com/r/${fromSubreddit}/hot/.json?count=20`);
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
    const selectedSubreddit = randomValueFromArray(SUBS)
    devLog(`Selected random subreddit ${selectedSubreddit} from ${SUBS}`)
    useEffect(() => {
        const fetchHot = async () => {
            devLog('useEffect start fetch')
            const image = await fetchImage(selectedSubreddit)
            setFoundImage(image)
            devLog('useEffect done')
        }
        fetchHot().catch(devLog)
    }, [selectedSubreddit])
    return {
        image,
        isLoading: !image
    }
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

function App() {

    return (
        <div className="App">
            <Image />
        </div>
    );
}

export default App;
