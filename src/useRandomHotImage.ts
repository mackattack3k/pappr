import { useEffect, useState } from "react";
import { devLog, randomValueFromArray } from "./utils";
import { API_URL } from "./config";
import { updateBearer } from "./App";

interface Post {
  data: {
    url: string;
  };
}

const fetchImage = async (fromSubreddit: string, accessToken: string) => {
  try {
    if (!accessToken) {
      devLog(`Tried to fetch image without access token (${accessToken})`);
      return;
    }
    const r = await fetch(`${API_URL}r/${fromSubreddit}/hot`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
        //"User-Agent": `Web:${CLIENT_ID}:0.0.1 (by /u/mackattack3k)`,
      },
    });
    const jsonR = await r.json();
    if (jsonR.error) {
      devLog(jsonR.error);
      return "nodata";
    }
    devLog({ jsonResponse: jsonR });
    const posts = jsonR.data.children as Post[];
    devLog({ allPosts: posts });
    const images = posts.map((post) => post.data.url);
    const randomImage = randomValueFromArray(images);
    devLog({ randomImage });
    return randomImage;
  } catch (e) {
    return "nodata";
  }
};

const defaultSubs = [
  "earthporn",
  "wallpapers",
  "EarthPorn",
  "CityPorn",
  "SkyPorn",
  "WeatherPorn",
  "BotanicalPorn",
  "LakePorn",
  "VillagePorn",
  "BeachPorn",
  "WaterPorn",
  "SpacePorn",
  "multiwall",
  "wallpapers",
  "wallpaper",
];
export const useRandomHotImage = () => {
  const [image, setFoundImage] = useState<string>();
  const access = window.localStorage.getItem("access");
  const subs = window.localStorage.getItem("subs");
  let availableSubs = subs ? JSON.parse(subs) : defaultSubs;
  const selectedSubreddit = randomValueFromArray(availableSubs);
  useEffect(() => {
    if (!access) {
      return;
    }
    if (image) {
      return;
    }
    devLog(
      `Selected random subreddit ${selectedSubreddit} from ${availableSubs}`
    );
    const parsedAccess = JSON.parse(access);
    const { access_token: accessToken, expiryDate } = parsedAccess;
    const needsAccessRefresh = new Date(expiryDate) < new Date();
    const fetchHot = async () => {
      devLog("useEffect start fetch");
      devLog(access);
      const image = await fetchImage(selectedSubreddit, accessToken);
      setFoundImage(image);
      devLog("useEffect done");
    };
    if (needsAccessRefresh) {
      devLog("Needs update of bearer");
      updateBearer().then(fetchHot);
      return;
    }
    fetchHot().catch(devLog);
  }, [access, availableSubs, selectedSubreddit, image]);
  return {
    image,
    isLoading: !image,
    subReddit: selectedSubreddit,
  };
};
