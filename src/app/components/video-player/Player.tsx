import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { SFlexCol } from "../common/containers/FlexContainers";
import video4 from "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C1L1P-E/20170302/G-C1L1P-Mar02-E-Irma_q2_04-08.mp4"

const SContainer = styled(SFlexCol)`
  grid-area: player;
  width: 100%;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.color_2_5};
  

`


function Player({ currentTime, path, layout }: any) {
  const videoRef = useRef(null) as any

  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);  

  useEffect(() => {
    if (videoRef.current) {
      // Set the video's current time to 30 seconds (for example)
      videoRef.current.addEventListener("error", handleVideoError)
      videoRef.current.currentTime = currentTime
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      // Set the video's current time to 30 seconds (for example)
      videoRef.current.addEventListener("error", handleVideoError)
      videoRef.current.currentTime = currentTime
    }
  }, [currentTime])

  useEffect(() => {
    switch(layout){
      case 'layout-1':
        setHeight(360);
        setWidth(640);
        break;
      
      case 'layout-2':
        setHeight(270);
        setWidth(480);
        break;
    }
  }, [layout]);

  useEffect(() => {
    path && console.log('path: ', path)
  }, [path]);



  const handleVideoError = () => {
    videoRef.current &&
      console.error("Error loading the video:", videoRef.current.error)
  }

  return (
    <SContainer>
      <video controls style={{objectFit: "contain"}}  width={width} height={height} ref={videoRef}>
        <source src={video4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </SContainer>
  )
}

export default Player
