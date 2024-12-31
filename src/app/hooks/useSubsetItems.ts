import { useEffect, useState } from "react"

export const useSubsetItems = (subsetItems: string) => {
  const [uniqueTypes, setUniqueTypes] = useState<any[]>([])
  const [hasROI, setHasROI] = useState<boolean>(false)
  const [hasTrims, setHasTrims] = useState<boolean>(false)
  const [hasPredictions, setHasPredictions] = useState<boolean>(false)
  const [hasSessionVideo, setHasSessionVideo] = useState<boolean>(false)
  const [videoCount, setVideoCount] = useState<number>(0)
  const [groundTruthCount, setGroundTruthCount] = useState<number>(0)

  useEffect(() => {
    const init = () => {
      setUniqueTypes(findUniqueTypes(subsetItems))
      setHasROI(checkROI(subsetItems))
      setHasTrims(checkTrims(subsetItems))
      setHasPredictions(checkPredictions(subsetItems))
      setVideoCount(checkVideoCount(subsetItems))
      setGroundTruthCount(checkGroundTruthCount(subsetItems))
      setHasSessionVideo(checkSessionVideo(subsetItems))
    }

    return init()
  }, [subsetItems])

  const findUniqueTypes = (subsetItems: any) => {
    const uniqueTypes = [...new Set(subsetItems.map((item: any) => item.type))]

    return uniqueTypes
  }

  const checkROI = (subsetItems: any) => {
    const roi = subsetItems.filter((item: any) => item.type === "session-roi")
    if (roi.length > 0) {
      return true
    }
    return false
  }

  const checkTrims = (subsetItems: any) => {
    const trims = subsetItems.filter((item: any) => item.type === "trims")
    if (trims.length > 0) {
      return true
    }

    return false
  }

  const checkPredictions = (subsetItems: any) => {
    const predictions = subsetItems.filter(
      (item: any) => item.type === "predictions"
    )
    if (predictions.length > 0) {
      return true
    }
    return false
  }

  const checkVideoCount = (subsetItems: any) => {
    const videos = subsetItems.filter((item: any) => item.type === "video")
    return videos.length
  }

  const checkGroundTruthCount = (subsetItems: any) => {
    const groundTruth = subsetItems.filter(
      (item: any) => item.type === "ground-truth"
    )
    return groundTruth.length
  }

  const checkSessionVideo = (subsetItems: any) => {
    const sessionVideo = subsetItems.filter(
      (item: any) => item.type === "session-video"
    )
    if (sessionVideo.length > 0) {
      return true
    }
    return false
  }

  

  return {
    uniqueTypes,
    hasROI,
    hasTrims,
    hasPredictions,
    videoCount,
    groundTruthCount,
    hasSessionVideo,
  }
}
