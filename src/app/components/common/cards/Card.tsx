import React from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../containers/FlexContainers'
import UsernameTag from '../UsernameTag'

interface IContainer {
    style: {
        width: string
        height: string
        border: string
        borderRadius: string
    }
}

const SContainer = styled(SFlexCol)<IContainer>`
    width: ${p => p.style.width};
    height: ${p => p.style.height};
    border: ${p => p.style.border};
    border-radius: ${p => p.style.borderRadius};
    background-color: ${({theme}) => theme.color.color_1};

    grid-area: profile;

    padding: 0;
    margin: 0;
    overflow: hidden;
 
`

const SImage = styled.img`
    width: 100%;
    object-fit: contain;
    
    
`


const Card = ({ cardStyle, imageSrc, children }: any) => {

  return (
    <SContainer style={cardStyle}>
        <SImage src={imageSrc}/>
        {children}
    </SContainer>
  )
}

export default Card