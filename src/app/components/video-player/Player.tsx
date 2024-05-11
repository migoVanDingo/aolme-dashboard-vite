import React, { useRef, useEffect } from "react"
import video from "/Users/bubz/Developer/master-project/aolme-backend/_fs/organization/ORGIUZAZNDBCFS2RLF5WY04UF/dataset/DAT9USSP13T8YXZ5U88AFEA3S/subset/SBSJXCH34019G3AHZHDQP0OPN/files/G-C2L1P-Feb23-B-Shelby_q2_04-06.mp4"

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



  const handleVideoError = () => {
    videoRef.current &&
      console.error("Error loading the video:", videoRef.current.error)
  }

  return (
    <div>
      <h2>Video Player</h2>
      <video controls width="858" height="480" ref={videoRef}>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default Player
