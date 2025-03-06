import React from 'react'
import styled from 'styled-components'
import { SFlexRow } from '../containers/FlexContainers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SOptionsContainer = styled(SFlexRow)<{gridArea: string}>`
  grid-area: ${p => p.gridArea || "auto"}; 
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

interface IOption {
    icon: any;
    label: string;
    option: string;
    callback?: (option: string) => void
}

interface IHeaderOptions {
    options: IOption[]
    gridArea?: string
    activeOption: string
    
}


const HeaderOptions = ({ options, gridArea, activeOption }: IHeaderOptions) => {

      const [hoverOption, setHoverOption] = React.useState("")


      const handleHover = (option: any) => {
        setHoverOption(option)
      }
    
      const handleOff = () => {
        setHoverOption("")
      }

    
  return (
    <SOptionsContainer gridArea={gridArea ? gridArea : ""}>
    {options.map((option: any, index: number) => {
      return (
        <SOption
          key={index}
          className={activeOption === option.option ? "active": hoverOption === option.option ? "hover" : ""}
          onMouseOver={() => handleHover(option.option)}
          onMouseOut={handleOff}
          onClick={() => option.callback(option.option)}
        >
          <SIcon
            className={activeOption === option.option ? "active" : ""}
            icon={option.icon}
          />
          {option.label}
        </SOption>
      )
    })}
  </SOptionsContainer>
  )
}

export default HeaderOptions