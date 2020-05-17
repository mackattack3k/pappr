import React from "react";
import {useRandomHotImage} from "./useRandomHotImage";

 const Background = () => {
    const hotImage = useRandomHotImage()
    if (hotImage.isLoading) {
        return <div className="loading"><h1>Loading</h1></div>
    }
    if (hotImage.image === 'nodata') {
        return <div className="loading"><h1>Error getting image</h1></div>
    }
    return <img className="bg"
                src={hotImage.image}
                alt="Wallpaper" />
};

 export default Background
