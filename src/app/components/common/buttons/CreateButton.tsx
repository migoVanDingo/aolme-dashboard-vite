import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

const SIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;

    &.sm{
        font-size: 0.8rem;
    }
`

const SButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  width: 120px;
  height: 30px;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  font-size: 0.8rem;
  background-color: ${({ theme }) => theme.color.color_1};

  color: ${({ theme }) => theme.color.color_7};
  gap: 5px;
  border-radius: 6px;
  
  &.sm {
    width: 120px;
    height: 25px;
    font-size: 0.8rem;
  }

  &.md {
    width: 150px;
    height: 30px;
    font-size: 0.9rem;
  }

  &.lg {
    width: 180px;
    height: 40px;
    font-size: 1rem;
  }

  &.inactive {
    background-color: ${({ theme }) => theme.color.color_2};
    color: ${({ theme }) => theme.color.color_5};
 
    margin-left: auto;

    &:hover {
      cursor: not-allowed;
    }
  }

  &.view {
    background-color: ${({ theme }) => theme.color.color_2_5};
    color: ${({ theme }) => theme.color.color_7};
    border: 1px solid ${({ theme }) => theme.color.color_4};
    box-sizing: border-box;
    height: 40px;

    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.color.color_9};
      border: 1px solid ${({ theme }) => theme.color.color_9};
    }
  }

  &.push-right {
    margin-left: auto;
  }

  &.create-new {
    background-color: ${({ theme }) => theme.accent.color_1_dim};
    color: ${({ theme }) => theme.color.color_7};
    font-weight: 500;
    box-shadow: 1px 2px 4px ${({ theme }) => theme.color.shadow.dark};
    margin-left: auto;
    box-sizing: border-box;

    height: 40px;

    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.accent.color_1};
      color: ${({ theme }) => theme.color.color_9};
    }
  }
`

const CreateButton = ({ handleClick, className, innerHtml, icon }: any) => {
  return (
    <SButton onClick={handleClick} className={className}>
      {innerHtml}
      {icon && <SIcon className={className} icon={icon} />}
    </SButton>
  )
}
export default CreateButton
