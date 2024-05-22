import React, { useRef, useEffect } from "react"
import styled from "styled-components"

const SContainer = styled.div`
  grid-area: player;

`


function Player({ currentTime, path }: any) {
  const videoRef = useRef(null)

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
    path && console.log('path: ', path)
  }, [path]);



  const handleVideoError = () => {
    videoRef.current &&
      console.error("Error loading the video:", videoRef.current.error)
  }

  return (
    <SContainer>
      <video controls  width="640" height="360" ref={videoRef}>
        <source src={path} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </SContainer>
  )
}

export default Player
