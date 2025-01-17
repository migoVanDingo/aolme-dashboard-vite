import React from "react"
import styled from "styled-components"
import { SFlexRow } from "../../../../common/containers/FlexContainers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlusCircle,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons"

const SHeader = styled.div`
  grid-area: top;
  width: 100%;
  padding: 20px 25px 0;
  margin: 0;

  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 40px 20px 60px;
  grid-template-areas:
    "heading heading"
    "subheading subheading"
    "options options";

  background-color: ${({ theme }) => theme.color.color_2};
  border-top-right-radius: ${({ theme }) => theme.container.borderRadius.lg};
  border-top-left-radius: ${({ theme }) => theme.container.borderRadius.lg};
  background-color: ${({ theme }) => theme.color.color_1};
`
const SHeading = styled.h1`
  grid-area: heading;
  font-size: 1.5rem;
  font-weight: 200;
  margin: 0;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.color.color_5};
`

const SSubHeadingContainer = styled(SFlexRow)`
  grid-area: subheading;
  align-items: baseline;
  gap: 5px;
`

const SCellContainer = styled(SFlexRow)`
  gap: 5px;
`
const SMetadataCell = styled.p`
  font-size: 0.9rem;
  font-weight: 200;
  margin: 0;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.color.color_5};

  &.label {
    font-weight: 400;
  }

  &.value {
    color: ${({ theme }) => theme.accent.color_2};
  }
`

const SOptionsContainer = styled(SFlexRow)`
  grid-area: options;
  align-items: flex-end;
  gap: 20px;
  width: 100%;


`

const SOption = styled(SFlexRow)`
  width: 150px;
  height: 40px;
  background-color: ${({ theme }) => theme.color.color_1};
  border: none;
  color: ${({ theme }) => theme.color.color_5};
  font-size: 0.9rem;
  box-sizing: content-box;
  transition: all 0.3s ease;
  align-items: center;
    justify-content: center;
    border-bottom: 2px solid transparent;



  &.active{
    color: ${({ theme }) => theme.accent.color_1 };
    border-bottom: 2px solid ${({ theme }) => theme.accent.color_1 };
    cursor: pointer;
  }

  &.hover{
  
    border-bottom: 2px solid ${({ theme }) => theme.color.color_5};
    cursor: pointer;
  }
`

const SIcon = styled(FontAwesomeIcon)`
  margin: 0 5px;

  &.active{
    color: ${({ theme }) => theme.accent.color_1 };
    
  }
`

const SButton = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};

  background-color: ${({ theme }) => theme.color.color_3};
  color: ${({ theme }) => theme.color.color_6};
  box-shadow: 2px 2px 2px ${({ theme }) => theme.color.color_1};
  margin-bottom: 10px;
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
    color: ${({ theme }) => theme.color.color_6};
    box-shadow: 2px 2px 2px ${({ theme }) => theme.color.color_1};
    margin-top: 10px;
    cursor: pointer;
  }
`

const SetViewHeader = ({
  fileConfig,
  fileSet,
  setMetadata,
  handleGoBack,
  handleSetViewOption,
}: any) => {
  const [hoverOption, setHoverOption] = React.useState("")
  const [activeOption, setActiveOption] = React.useState("VIEW")


  const viewOptions = [
    {
      label: "Label Projects",
      option: "VIEW",
      icon: faProjectDiagram,
    },
    {
      label: "Create New",
      option: "NEW",
      icon: faPlusCircle,
    },
  ]

  const handleHover = (option: any) => {
    setHoverOption(option)
  }

  const handleOff = () => {
    setHoverOption("")
  }

  const handleSetActiveOption = (option: any) => {
    console.log("option", option)
    setActiveOption(option)
    handleSetViewOption(option)
  }

  return (
    <SHeader>
      <SHeading>File Set: {fileSet.set_name}</SHeading>
      <SSubHeadingContainer>
        {fileConfig &&
          fileConfig.map((config: any, index: number, arr: any) => {
            return (
              <SCellContainer key={index}>
                <SMetadataCell className={"label"} key={config.id}>
                  {config.field_label}:
                </SMetadataCell>
                <SMetadataCell className={"value"} key={config.id}>
                  {setMetadata[config.field_name]}
                </SMetadataCell>
                {index !== arr.length - 1 && (
                  <SMetadataCell key={config.id}>{"/"}</SMetadataCell>
                )}
              </SCellContainer>
            )
          })}
      </SSubHeadingContainer>
      <SOptionsContainer>
        {viewOptions.map((option: any, index: number) => {
          return (
            <SOption
              key={index}
              className={activeOption === option.option ? "active": hoverOption === option.option ? "hover" : ""}
              onMouseOver={() => handleHover(option.option)}
              onMouseOut={handleOff}
              onClick={() => handleSetActiveOption(option.option)}
            >
              <SIcon
                className={activeOption === option.option ? "active" : ""}
                icon={option.icon}
              />
              {option.label}
            </SOption>
          )
        })}

        <SButton onClick={handleGoBack} className={"push-right sm"} type="button">
          {"Go Back"}
          </SButton>
      </SOptionsContainer>
    </SHeader>
  )
}

export default SetViewHeader
