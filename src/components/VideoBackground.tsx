"use client"
import { useEffect } from "react";
import styled from 'styled-components';

const VideoContent = styled.video`
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0; /* Initially set opacity to 0 */
  transition: opacity 1s ease-in-out; /* Define the transition */
  &.fadeIn {
    opacity: 1; /* Set opacity to 1 for fade-in effect */
  }
`;

const VideoBackground: React.FC<{ videoSource: string }> = ({ videoSource }) => {

  // Trigger the fade-in effect after the video source changes
  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      video.addEventListener('loadeddata', () => {
        video.style.opacity = '1';
      });
    }
  }, [videoSource]);

  return (
    <VideoContent autoPlay loop muted preload="auto">
      <source src={videoSource} type="video/mp4" />
      Your browser does not support the video tag.
    </VideoContent>
  );
};

export default VideoBackground;
