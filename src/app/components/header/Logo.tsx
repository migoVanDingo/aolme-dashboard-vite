import React from 'react'
import styled from 'styled-components'
import LogoImg from '../../../assets/Logo.png'
import { useNavigate } from 'react-router-dom'

const SLogoContainer = styled.div`
    width: 150px;
    height: 30px;

    &:hover{
      cursor: pointer;
    }
  
`
const SImage = styled.img`
    width: 150px;
    height: 30px;
    object-fit: contain;
`

const Logo = () => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/profile')
  }

  return (
    <SLogoContainer onClick={handleClick}>
        <SImage src={LogoImg}/>
    </SLogoContainer>
  )
}

export default Logo