import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers"
import CreateSubset from "./CreateSubset"
import EmptySubsets from "./EmptySubsets"
import SubsetCard from "./SubsetCard"
import { useNavigate, useRouteLoaderData } from "react-router-dom"

const SContainer = styled(SFlexCol)`
  padding: 0;
  width: 1000px;
  border-radius: ${({ theme }) => theme.container.borderRadius.lg};

  padding: 20px;
  gap: 20px;

  &.active {
    border: 1px solid ${({ theme }) => theme.color.color_3};
  }
`
const SAddSubset = styled(SFlexCol)``

const SButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${({ theme }) => theme.color.color_6};
  border: 1px solid ${({ theme }) => theme.color.color_6};
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  height: 30px;
  width: 200px;
  gap: 5px;
  margin-bottom: 10px;

  &.subset {
    margin-left: auto;
  }

  &.hover {
    color: ${({ theme }) => theme.accent.color_1};
    border-color: ${({ theme }) => theme.accent.color_1};
    cursor: pointer;
  }
`
const SIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.color.color_6};

  &.hover {
    color: ${({ theme }) => theme.accent.color_1};
  }
`

const SDsHeading = styled.h1`
  font-size: 2rem;
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_6};
`

const SSubsetHeading = styled(SFlexRow)`
  width: 100%;
  align-items: center;
  margin-bottom: 0px;
  margin-right: auto;
`

const SHeading = styled(SFlexCol)`
  width: 100%;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
`
const SPara = styled.p`
  font-size: 1rem;
  font-weight: 200;
  margin: 0px 0;
  text-align: left;
  color: ${({ theme }) => theme.color.color_6};
  line-height: 1.5rem;
`

const Subset = ({
  subsets,
  dataset,
  isNewSubsetActive,
  createViewActive,
  createViewInactive,
  triggerRender,
  isHoverButton,
  hoverOnButton,
  hoverOffButton,
}: any) => {

  const nav = useNavigate()

  const { orgName } = useRouteLoaderData("org") as { orgName: string }

  const [isHoverNew, setHoverNew] = useState<boolean>(false)
  const hoverOn = () => setHoverNew(true)
  const hoverOff = () => setHoverNew(false)

  const handleAddSubset = () => {
    nav("/organization/"+orgName+"/datasets/"+dataset.name+"/subset")
  }

  return (
    <SContainer className={!isNewSubsetActive ? "active" : ""}>
      <SHeading>
        <SSubsetHeading>
          <SDsHeading>{"Subsets"}</SDsHeading>
          <SButton
            className={isHoverButton ? "hover subset" : "subset"}
            onClick={handleAddSubset}
            onMouseOver={hoverOnButton}
            onMouseLeave={hoverOffButton}
          >
            <SIcon className={isHoverButton ? "hover" : ""} icon={faAdd} />
            Add Subset
          </SButton>
        </SSubsetHeading>
        <SPara>
          {
            "Simply put, subsets are sets of files. A dataset can be made up of one or more subsets.  Create a subset to group files together.  For example, if you are annotating video, you may want to upload a few videos and existing annotations for that video. This is the perfect case for a subset!"
          }
        </SPara>
      </SHeading>

      {subsets && subsets.length > 0 ? (
        subsets.map((subset: any) => {
          return (
            <SubsetCard
              key={subset.subset_id}
              subset={subset}
              dataset={dataset}
            />
          )
        })
      ) : (
        <EmptySubsets
          hover={isHoverNew}
          hoverOn={hoverOn}
          hoverOff={hoverOff}
          handleCreateNew={createViewActive}
        />
      )}
    </SContainer>
  )
}

export default Subset
