import { useEffect, useState } from "react"

export const useSetLabelProjects = (setId: string) => {
  const [labelProjects, setLabelProjects] = useState<any[]>([])

  useEffect(() => {
    const init = () => {
      if (setId !== "") {
        getLabelProjects(setId)
      }
    }

    return init()
  }, [setId])

  const getLabelProjects = async (setId: string) => {
    console.log("useSetLabelProjects::GET_LABEL_PROJECTS:: NOT_IMPLEMENTED")
  }

  return {
    labelProjects,
  }
}
