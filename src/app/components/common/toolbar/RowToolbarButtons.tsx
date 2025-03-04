import React from 'react'
import { SFlexRow } from '../containers/FlexContainers'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SContainer = styled(SFlexRow)`
    width: 100%;
    box-sizing: border-box;

`

const SItem = styled(SFlexRow)`
    flex: 1;

    height: 40px;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    color: ${({theme}) => theme.color.color_6};
    gap: 5px;
    background-color: ${({theme}) => theme.color.color_1};
    border: 1px solid transparent;

    transition: font-weight 0.3s ease, background-color 0.3s ease, border 0.3s ease, color 0.3s ease;
   

    &:not(:first-child) {
        border-left: 1px solid ${({theme}) => theme.color.color_3};
    }

    &:hover {
        cursor: pointer;
        background-color: ${({theme}) => theme.color.color_2_5};
        border: 1px solid ${({theme}) => theme.color.color_3};

    }

    &.active {
        background-color: ${({theme}) => theme.accent.color_2};

        color: ${({theme}) => theme.color.color_1};
        font-weight: 600;
    }
`
const SIcon = styled(FontAwesomeIcon)`
    font-size: 0.8rem;
    color: ${({theme}) => theme.color.color_6};
    transition: font-weight 0.3s ease, background-color 0.3s ease,  color 0.3s ease;

    &.active {
        background-color: ${({theme}) => theme.accent.color_1_dim};

        color: ${({theme}) => theme.color.color_1};
        font-weight: 600;
    }
`

const RowToolbarButtons = ({items, activeItem, setActiveItem}: any) => {
  return (
    <SContainer>
        {
            items && items.map((item: any) => {
                return (
                    <SItem onClick={() => setActiveItem(item.id)} className={item.id === activeItem ? "active" : ""}><SIcon className={item.id === activeItem ? "active" : ""} icon={item.icon}/> {item.label}</SItem>
                )
        }
        )}
    </SContainer>
  )
}

export default RowToolbarButtons