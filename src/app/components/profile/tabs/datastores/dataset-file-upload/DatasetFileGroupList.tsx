import React, { useEffect } from "react"
import styled from "styled-components"
import { SFlexRow } from "../../../../common/containers/FlexContainers"
import LoadingSpinner from "../../../../common/loading/LoadingSpinner"
import { PayloadAddFilesToDataset } from "../../../../../api/payload/PayloadAddFilesToDataset"
import { DatasetAPI } from "../../../../../api/DatasetAPI"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Routes from "../../../../../../constants/routes"

const SContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 80px auto;
  grid-template-areas:
    "top"
    "bottom";
`

const SHeader = styled(SFlexRow)`
  grid-area: top;
  width: 100%;
  padding: 15px 25px 15px;
  margin: 0;
  align-items: baseline;
  gap: 20px;
  background-color: ${({ theme }) => theme.color.color_2};
  border-top-right-radius: ${({ theme }) => theme.container.borderRadius.lg};
  border-top-left-radius: ${({ theme }) => theme.container.borderRadius.lg};
`

const SHeading = styled.h1`
  font-size: 1.5rem;
  font-weight: 200;
  margin: 0;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.color.color_5};
  padding: 0;
`

const SButton = styled.button`
  width: 130px;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  background-color: ${({ theme }) => theme.color.color_3};
  color: ${({ theme }) => theme.color.color_6};
  box-shadow: 2px 2px 2px ${({ theme }) => theme.color.color_1};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.color_4};
    color: ${({ theme }) => theme.color.color_8};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.color_6};
    color: ${({ theme }) => theme.color.color_8};
  }

  &.push-right {
    margin-left: auto;
  }

  &.submit {
    background-color: ${({ theme }) => theme.accent.color_1};
    color: ${({ theme }) => theme.color.color_8};
    box-shadow: 2px 2px 2px ${({ theme }) => theme.color.color_1};
  }

  &.remove {
    background-color: #b10000;
    color: ${({ theme }) => theme.color.color_8};
    box-shadow: 2px 2px 2px ${({ theme }) => theme.color.color_1};
  }

  &.sm {
    width: 100px;
    height: 30px;
  }
`

const SList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  grid-area: bottom;
`
const SListItem = styled.li`
  width: 100%;
  padding: 10px 15px;
  background-color: transparent;
  transition: all 0.2s ease;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.color_3};
  color: ${({ theme }) => theme.color.color_6};

  &:hover {
    background-color: ${({ theme }) => theme.color.color_2_5};
    cursor: pointer;
  }

  &.active {
    background-color: ${({ theme }) => theme.color.color_4};
  }
`

const SItemCell = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  font-family: "Helvetica", sans-serif;
  font-weight: 200;

  &.sm {
    width: 20px;
  }

  &.md {
    width: 150px;
  }

  &.lg {
    width: 350px;
  }
`

const SButtonContainer = styled(SFlexRow)`
  width: 100%;
  gap: 20px;
  padding: 35px;
  margin: 0;
  box-sizing: border-box;
`

const DatasetFileGroupList = ({ sets, handleToggle }: any) => {
  const nav = useNavigate()

  const [formSets, setFormSets] = React.useState<any>([])
  const [toggleAll, setToggleAll] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  // Sync formSets with sets prop
  useEffect(() => {
    if (sets) {
      setFormSets(
        sets.map((set: any) => ({ ...set, selected: set.selected || false })),
      )
    }
  }, [sets])

  const handleToggleAll = () => {
    const newToggleAll = !toggleAll
    setToggleAll(newToggleAll)
    setFormSets((prevSets: any) =>
      prevSets.map((set: any) => ({ ...set, selected: newToggleAll })),
    )
  }

  // Toggle selected state
  const toggleSets = (setId: string) => {
    setFormSets((prevSets: any) =>
      prevSets.map((set: any) =>
        set.setId === setId ? { ...set, selected: !set.selected } : set,
      ),
    )
  }

  // Handle submit
  const handleSubmit = () => {
    const userId = sessionStorage.getItem("userId")
    const datasetId = sessionStorage.getItem("datasetId")

    if (!userId || !datasetId) {
      console.error(
        "CLS: DatasetFileGroupList --- FN: handleSubmit ---",
        "userId or datasetId not found",
      )
      window.alert("userId or datasetId not found")
      return
    }

    const selectedSets = formSets.filter((set: any) => set.selected)
    const payload = PayloadAddFilesToDataset(userId, datasetId, selectedSets)
    setLoading(true)
    console.log("payload", payload)
    DatasetAPI.addFilesToDatasetFromDatastore(payload)
      .then((res: any) => {
        sessionStorage.setItem("datasetId", datasetId)
        nav(Routes.PROFILE_DATASTORES)
        setLoading(false)
      })
      .catch((err: any) => {
        console.error("CLS: DatasetFileGroupList --- FN: handleSubmit ---", err)
        setLoading(false)
      })
  }

  if (loading) {
    return <LoadingSpinner message={"Adding Files to Dataset"} />
  } else
    return (
      <SContainer>
        <SHeader>
          <SHeading>Select to Add to Dataset</SHeading>

          <SButton className={"push-right"} onClick={handleToggle}>
            Back to Search
          </SButton>
          <SButton
            className={!toggleAll ? "submit" : "remove"}
            onClick={handleToggleAll}
          >
            {!toggleAll ? "Add All" : "Remove All"}
          </SButton>
        </SHeader>

        <SList>
          <SListItem>
            <SItemCell className={"sm"}>{"#"}</SItemCell>
            <SItemCell className={"lg"}>{"Name"}</SItemCell>
            <SItemCell className={"md"}>{"Total # in Set"}</SItemCell>
            <SItemCell className={"md"}>{"Add/Remove"}</SItemCell>
          </SListItem>
          {formSets.map((set: any, index: number) => (
            <SListItem key={index}>
              <SItemCell className={"sm"}>{index + 1}</SItemCell>
              <SItemCell className={"lg"}>{set.setName}</SItemCell>
              <SItemCell className={"md"}>{set.num_files}</SItemCell>
              <SItemCell className={"md"}>
                <SButton
                  className={`${set.selected ? "remove" : "submit"} ${"sm"}`}
                  onClick={() => toggleSets(set.setId)}
                >
                  {set.selected ? "Remove" : "Add"}
                </SButton>
              </SItemCell>
            </SListItem>
          ))}
          <SButtonContainer>
            <SButton className={"push-right"} onClick={handleSubmit}>
              Add To Dataset
            </SButton>
          </SButtonContainer>
        </SList>
      </SContainer>
    )
}

export default DatasetFileGroupList
