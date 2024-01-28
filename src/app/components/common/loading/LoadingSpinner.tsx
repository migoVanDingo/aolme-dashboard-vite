import React from "react"
import styled, { keyframes } from "styled-components"
import { SFlexCol } from "../containers/FlexContainers"

const SLoadingContainer = styled(SFlexCol)`
  
  width: 500px;
  height: 350px;
  border-radius:${({ theme }) => theme.container.borderRadius.lg};
  background-color: ${({ theme }) => theme.color.color_2};
  box-shadow: ${({ theme }) => theme.color.shadow.dark};
  
  padding-top: 50px;
  box-sizing: border-box;
`

const SLoadingHeading = styled.p`
  font-size: 2rem;
  font-family: "Helvetica", sans-serif;
  color: ${({ theme }) => theme.accent.color_1};
  font-weight: 700;

`
const myAnimation = keyframes`
  
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }

`
const SSpinner = styled.div`
  &.lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  &.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid ${({ theme }) => theme.accent.color_1};
    border-radius: 50%;
    animation: ${myAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ theme }) => theme.accent.color_1} transparent transparent transparent;
  }
  &.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  &.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  &.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
`

const LoadingSpinner = () => {
  return (
    <SLoadingContainer>
      <SLoadingHeading>Initializing Project</SLoadingHeading>
      <SSpinner className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </SSpinner>
    </SLoadingContainer>
  )
}

export default LoadingSpinner
