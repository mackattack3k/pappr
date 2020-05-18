import React, { useState } from "react";
import { useRandomHotImage } from "./useRandomHotImage";

const Background = () => {
  const hotImage = useRandomHotImage();
  const [hasBrowserLoadedImage, setHasLoadedImage] = useState<boolean>();
  if (hotImage.isLoading) {
    return (
      <div className="loading">
        <h1>Loading from /r/{hotImage.subReddit}</h1>
      </div>
    );
  }
  if (hotImage.image === "nodata") {
    return (
      <div className="loading">
        <h1>Error getting image</h1>
      </div>
    );
  }
  return (
    <>
      {!hasBrowserLoadedImage && (
        <div className="loading">
          <h1>Loading from /r/{hotImage.subReddit}</h1>
        </div>
      )}
      <img
        className={hasBrowserLoadedImage ? "bg" : "bg hidden"}
        src={hotImage.image}
        onLoad={() => setHasLoadedImage(true)}
        alt="Wallpaper"
      />
    </>
  );
};

export default Background;
