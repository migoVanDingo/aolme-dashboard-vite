import { useEffect, useState } from "react"

export const useSelectGroups = (selectionFormProps: any, groups: any) => {
  const [activityMapGroups, setActivityMapGroups] = useState<any>([])

  /* This formState and the below handleChange fn handle the state changes of this dynamic form */

  // Initialize form state
  const [formState, setFormState] = useState(
    selectionFormProps.reduce((acc: any, field: any) => {
      acc[field.name] = ""
      return acc
    }, {})
  )

  const [formOptions, setFormOptions] = useState<any>(
    selectionFormProps.reduce((acc: any, field: any) => {
      acc[field.name] = field.options
      return acc
    }, {})
  )

  const [formDisabled, setFormDisabled] = useState<any>(
    selectionFormProps.reduce((acc: any, field: any) => {
      acc[field.name] = field.disabled
      return acc
    }, {})
  )

  const updateOptions = (field: string, newOptions: any) => {
    setFormOptions((prevState: any) => ({
      ...prevState,
      [field]: newOptions,
    }))
  }

  const enableField = (field: string) => {
    switch (field) {
      case "level": {
        updateOptions("level", getLevelOptions())
        setFormDisabled((prevState: any) => ({
          ...prevState,
          level: false,
        }))
        break
      }
      case "school": {
        updateOptions("school", getSchoolOptions())
        setFormDisabled((prevState: any) => ({
          ...prevState,
          school: false,
        }))
        break
      }
      case "quality": {
        updateOptions("quality", getQualityOptions())
        setFormDisabled((prevState: any) => ({
          ...prevState,
          quality: false,
        }))
        break
      }
      case "date": {
        updateOptions("date", getDateOptions())
        setFormDisabled((prevState: any) => ({
          ...prevState,
          date: false,
        }))
        break
      }
      case "facilitator": {
        updateOptions("facilitator", getFacilitatorOptions())
        setFormDisabled((prevState: any) => ({
          ...prevState,
          facilitator: false,
        }))
        break
      }

      case "group":{
        updateOptions("group", getGroups())
        setFormDisabled((prevState: any) => ({
          ...prevState,
          group: false,
        }))
        break
      }
    }
  }

  // Sets the value of the changed field in the form. If user changed an upstream value, then the downstream values are reset
  const handleChange = (event: any) => {
    const { name, value } = event.target
    switch (name) {
      case "cohort": {
        setFormState((prevState: any) => ({
          ...prevState,
          cohort: value,
          level: "",
          school: "",
          quality: "",
          date: "",
          facilitator: "",
          group: "",
        }))
        selectionFormProps.map((field: any) => {
          if (field.name !== "cohort") {
            setFormDisabled((prevState: any) => ({
              ...prevState,
              [field.name]: true,
            }))
          }
        })
        setActivityMapGroups([])
        break
      }
      case "level": {
        setFormState((prevState: any) => ({
          ...prevState,
          level: value,
          school: "",
          quality: "",
          date: "",
          facilitator: "",
          group:""
        }))
        selectionFormProps.map((field: any) => {
          if (field.name !== "level" && field.name !== "cohort") {
            setFormDisabled((prevState: any) => ({
              ...prevState,
              [field.name]: true,
            }))
          }
        })
        setActivityMapGroups([])
        break
      }
      case "school": {
        setFormState((prevState: any) => ({
          ...prevState,
          school: value,
          quality: "",
          date: "",
          facilitator: "",
          group:""
        }))
        selectionFormProps.map((field: any) => {
          if (
            field.name !== "school" &&
            field.name !== "level" &&
            field.name !== "cohort"
          ) {
            setFormDisabled((prevState: any) => ({
              ...prevState,
              [field.name]: true,
            }))
          }
        })
        break
      }
      case "quality": {
        setFormState((prevState: any) => ({
          ...prevState,
          quality: value,
          date: "",
          facilitator: "",
          group:""
        }))
        selectionFormProps.map((field: any) => {
          if (
            field.name !== "quality" &&
            field.name !== "school" &&
            field.name !== "level" &&
            field.name !== "cohort"
          ) {
            setFormDisabled((prevState: any) => ({
              ...prevState,
              [field.name]: true,
            }))
          }
        })
        break
      }
      case "date": {
        setFormState((prevState: any) => ({
          ...prevState,
          date: value,
          facilitator: "",
          group:""
        }))
        selectionFormProps.map((field: any) => {
          if (
            field.name !== "date" &&
            field.name !== "quality" &&
            field.name !== "school" &&
            field.name !== "level" &&
            field.name !== "cohort"
          ) {
            setFormDisabled((prevState: any) => ({
              ...prevState,
              [field.name]: true,
            }))
          }
        })
        break
      }
      case "facilitator": {
        setFormState((prevState: any) => ({
          ...prevState,
          facilitator: value,
        }))
        selectionFormProps.map((field: any) => {
          if (
            field.name !== "facilitator" &&
            field.name !== "date" &&
            field.name !== "quality" &&
            field.name !== "school" &&
            field.name !== "level" &&
            field.name !== "cohort"
          ) {
            setFormDisabled((prevState: any) => ({
              ...prevState,
              [field.name]: true,
            }))
          }
        })
        break
      }
    }
    /* setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
    })) */
  }

  const getCohortOptions = () => {
    const cohorts = groups.map((group: any) => group.cohort)
    return [...new Set(cohorts)]
  }

  const getLevelOptions = () => {
    const cohorts = groups.filter(
      (groups: any) => groups.cohort === formState.cohort
    )

    const levels = cohorts.map((group: any) => group.level)

    const levelOptions = [...new Set(levels)]
    return levelOptions
  }

  const getSchoolOptions = () => {
    const cohorts = groups.filter(
      (groups: any) => groups.cohort === formState.cohort
    )
    const levels = cohorts.filter(
      (group: any) => group.level === formState.level
    )
    const schools = levels.map((group: any) => group.school)
    setActivityMapGroups(levels)
    return [...new Set(schools)]
  }

  const getDateOptions = () => {
    const cohorts = groups.filter(
      (groups: any) => groups.cohort === formState.cohort
    )
    const levels = cohorts.filter(
      (group: any) => group.level === formState.level
    )
    const schools = levels.filter(
      (group: any) => group.school === formState.school
    )
    const quality = schools.filter(
      (group: any) => group.quality === formState.quality
    )
    const dates = quality.map((group: any) => group.date)
    setActivityMapGroups(quality)
    return [...new Set(dates)]
  }

  const getQualityOptions = () => {
    const cohorts = groups.filter(
      (groups: any) => groups.cohort === formState.cohort
    )
    const levels = cohorts.filter(
      (group: any) => group.level === formState.level
    )
    const schools = levels.filter(
      (group: any) => group.school === formState.school
    )
    const quality = schools.map((group: any) => group.quality)
    setActivityMapGroups(schools)
    return [...new Set(quality)]
  }

  const getFacilitatorOptions = () => {
    const cohorts = groups.filter(
      (groups: any) => groups.cohort === formState.cohort
    )
    const levels = cohorts.filter(
      (group: any) => group.level === formState.level
    )
    const schools = levels.filter(
      (group: any) => group.school === formState.school
    )
    const quality = schools.filter(
      (group: any) => group.quality === formState.quality
    )
    const dates = quality.filter((group: any) => group.date === formState.date)
    const facilitators = dates.map((group: any) => group.facilitator)
    setActivityMapGroups(dates)
    return [...new Set(facilitators)]
  }

  const getGroups = () => {
    const cohorts = groups.filter(
      (groups: any) => groups.cohort === formState.cohort
    )
    const levels = cohorts.filter(
      (group: any) => group.level === formState.level
    )
    const schools = levels.filter(
      (group: any) => group.school === formState.school
    )
    const quality = schools.filter(
      (group: any) => group.quality === formState.quality
    )
    const dates = quality.filter((group: any) => group.date === formState.date)
    const facilitators = dates.filter(
      (group: any) => group.facilitator === formState.facilitator
    )
    const groupNames = facilitators.map((group: any) => group.group_name)

    setActivityMapGroups(facilitators)
    setFormState((prevState: any) => ({
      ...prevState,
      group: facilitators[0].group_name,
    }))
    return [...new Set(groupNames)]
  }

  const handleReset = () => {
    setFormState(
      selectionFormProps.reduce((acc: any, field: any) => {
        acc[field.name] = ""
        return acc
      }, {})
    )
    setFormDisabled(
      selectionFormProps.reduce((acc: any, field: any) => {
        if (field.name !== "cohort") {
          acc[field.name] = field.disabled
        }
        return acc
      }, {})
    )
  }

  useEffect(() => {
    return () => {
      const cohortOptions = getCohortOptions()
      updateOptions("cohort", cohortOptions)
    }
  }, [groups])

  useEffect(() => {
    if (formState.cohort !== "") {
      enableField("level")
    }
  }, [formState.cohort])

  useEffect(() => {
    if (formState.level !== "") {
      enableField("school")
    }
  }, [formState.level])

  useEffect(() => {
    if (formState.school !== "") {
      enableField("quality")
    }
  }, [formState.school])

  useEffect(() => {
    if (formState.quality !== "") {
      enableField("date")
    }
  }, [formState.quality])

  useEffect(() => {
    if (formState.date !== "") {
      enableField("facilitator")
    }
  }, [formState.date])

  useEffect(() => {
    if (formState.facilitator !== "") {
      enableField("group")
      getGroups()
    }
  }, [formState.facilitator])
  

  return {
    formState,
    formOptions,
    formDisabled,
    activityMapGroups,
    handleChange,
    updateOptions,
    handleReset,
  }

  // Get unique values by field
}
