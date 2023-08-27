import React from 'react'
import styled from 'styled-components'
import LogoImg from '../../../assets/Logo.png'

const SLogoContainer = styled.div`
    width: 150px;
    height: 30px;
  
`
const SImage = styled.img`
    width: 150px;
    height: 30px;
    object-fit: contain;
`

const Logo = () => {
  return (
    <SLogoContainer>
        <SImage src={LogoImg}/>
    </SLogoContainer>
  )
}

export default Logo