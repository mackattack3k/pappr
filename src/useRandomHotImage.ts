import {useEffect, useState} from "react";
import {devLog, randomValueFromArray} from "./utils";
import {API_URL, CLIENT_ID} from "./config";

interface Post {
    data: {
        url: string;
    }
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

const defaultSubs = ['earthporn', 'wallpapers']
export const useRandomHotImage = () => {
    const [image, setFoundImage] = useState<string>()
    const access = window.localStorage.getItem('access');
    const subs = window.localStorage.getItem('subs');
    let availableSubs = subs ? JSON.parse(subs) : defaultSubs
    const selectedSubreddit = randomValueFromArray(availableSubs)
    devLog(availableSubs)
    useEffect(() => {
        if (!access) {
            return
        }
        devLog(`Selected random subreddit ${selectedSubreddit} from ${availableSubs}`)
        const fetchHot = async () => {
            devLog('useEffect start fetch')
            devLog(access)
            const accessToken = JSON.parse(access).access_token
            const image = await fetchImage(selectedSubreddit, accessToken)
            setFoundImage(image)
            devLog('useEffect done')
        }
        fetchHot().catch(devLog)
    }, [access, availableSubs])
    return {
        image,
        isLoading: !image,
        subReddit: selectedSubreddit
    }
};
