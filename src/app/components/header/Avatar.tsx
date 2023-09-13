import React from 'react'
import styled from 'styled-components'

const SAvatarContainer = styled.div`
    height: 30px;
    width: 30px;
    border-radius: 30px;
    border: 1px solid ${({theme}) => theme.color.color_5};

    &.small{
      height: 15px;
      width: 15px;
      border-radius: 30px;
    }

    &:hover{
        border: 1px solid ${({theme}) => theme.color.color_7};
        cursor: pointer;
    }

`

const Avatar = ({ className }: any) => {
  return (
    <SAvatarContainer className={className}></SAvatarContainer>
  )
}

export default Avatar