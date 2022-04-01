import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./Player.module.css";
import { useNavigate } from "react-router-dom";

const FORMATS_VIDEO = ["mp4", "ogv", "avi"];

export default function Player({ video, image }) {
  const [videoUrls, setVideoUrls] = useState([]);
  const fullScreenVideoRef = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
    const getAllPosibilitiesVideoUrls = () => {
      if (video?.endsWith("mp4")) {
        /* To change the video path to play it in all browsers */
        const formatIndex = video.indexOf("mp4");
        const videoUrlWithoutFormat = video.slice(0, formatIndex);
        const newVideoUrls = FORMATS_VIDEO.map(
          (format) => `${videoUrlWithoutFormat}${format}`
        );
        setVideoUrls(newVideoUrls);
      }
    };

    const fullScreenVideoPlayer = () => {
      const videoFullScreen = fullScreenVideoRef.current;
      if (videoFullScreen?.requestFullscreen) {
        videoFullScreen.requestFullscreen();
      }
    };

    getAllPosibilitiesVideoUrls();
    fullScreenVideoPlayer();
    
  }, []);

  return (
    <video
      className={styles.video}
      autoPlay
      controls
      poster={image}
      ref={fullScreenVideoRef}
      // To go at the Home page
      onEnded={() => navigate(`/`)}
    >
      {/* To play the video in all browsers */}
      {videoUrls.map((url, indx) => {
        const lastWord = url.split(".").pop();
        return (
          <source key={indx} src={url} type={`video/${lastWord}`}></source>
        );
      })}
    </video>
  );
}

Player.propTypes = {
  video: PropTypes.string,
  image: PropTypes.string,
};