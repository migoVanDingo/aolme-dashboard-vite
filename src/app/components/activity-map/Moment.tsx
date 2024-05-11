import React from "react"
import styled from "styled-components"
import { SFlexRow } from "../common/containers/FlexContainers"

interface IProps {
  end: number
  width: number
  start: number
  color: string
}

const STimelineItem = styled(SFlexRow)<IProps>`
  width: ${(p) => p.width + "px"};
  margin-left: ${(p) => p.start + "px"};
  height: 5px;
  z-index: 2;
  background-color: ${(p) => p.color};
  align-items: center;
  position: absolute;
  top: -1px;
`

interface IStartThumb {
  start: number
  color: string
}

const SStartThumb = styled.div<IStartThumb>`
  width: 10px;
  height: 10px;
  background-color: ${(p) => p.color};
  border-radius: 50%;
  z-index: 3;
  position: absolute;
  margin-left: ${(p) => p.start + "px"};
  top: -3.5px;

  &:hover {
    border: 1px solid white;
    cursor: pointer;
  }
`

interface IEndThumb {
  end: number
  color: string
}

const SEndThumb = styled.div<IEndThumb>`
  width: 10px;
  height: 10px;
  background-color: ${(p) => p.color};
  border-radius: 50%;
  z-index: 3;
  position: absolute;
  margin-left: ${(p) => p.end + "px"};
  top: -3.5px;
  &:hover {
    border: 1px solid white;
    cursor: pointer;
  }
`

const Moment = ({
  start,
  end,
  width,
  handleClickStart,
  handleClickEnd,
  color
}: any) => {
  return (
    <>
      <SStartThumb color={color.color} onClick={handleClickStart} start={start - 8} />
      <STimelineItem color={color.color} start={start} end={end} width={width} />
      <SEndThumb color={color.color} onClick={handleClickEnd} end={end - 2} />
    </>
  )
}

export default Moment
