import React from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { SFlexCol, SFlexRow } from "../../common/containers/FlexContainers";


const STable = styled(SFlexCol)`
    width: 100%;



`

const STableRow = styled(SFlexRow)`
    width: 100%;
    flex: 1;
    padding: 5px 1rem;
    box-sizing: border-box; 

    &.br-md{
      &:first-child{
        border-top-left-radius: ${({ theme }) => theme.container.borderRadius.md};
        border-top-right-radius: ${({ theme }) => theme.container.borderRadius.md};
      }

      &:last-child{
        border-bottom-left-radius: ${({ theme }) => theme.container.borderRadius.md};
        border-bottom-right-radius: ${({ theme }) => theme.container.borderRadius.md};
      }
    }

    &.border {

      &:first-child{
        border-top: 1px solid ${({ theme }) => theme.color.color_3};
        border-right: 1px solid ${({ theme }) => theme.color.color_3};
        border-left: 1px solid ${({ theme }) => theme.color.color_3};
      }

      &:not(:first-child){
      border-right: 1px solid ${({ theme }) => theme.color.color_3};
      border-left: 1px solid ${({ theme }) => theme.color.color_3};
      border-bottom: 1px solid ${({ theme }) => theme.color.color_3};
    }

      
    }
    &.head {
        background-color: ${({ theme }) => theme.color.color_1};

        min-height: 50px;
        align-items: center;
        color: ${({ theme }) => theme.accent.color_2};
    }
    &.dark {
        background-color: ${({ theme }) => theme.color.color_2_5};
    }

    &.light {
        background-color: ${({ theme }) => theme.color.color_2};
    }

    &.p-sm{
        padding: 1.2rem;
    }

`

const SRowCell = styled(SFlexRow)`


    &.sm {
        width: 100px;
        flex:1;
    }

    &.md {
        width: 150px;
        flex: 2;

    }

    &.lg {
        width: 250px;
        flex: 3;
    }


    `

const SLink = styled.a`
    color: ${({ theme }) => theme.color.color_7};
    cursor: pointer;
    text-decoration: underline;
    &:hover{
        color: ${({ theme }) => theme.accent.color_2};
    }
`

const GithubReposDataTable = ({ columns, data, actionLabel, handleClick, rowPadding, border, borderRad }: any) => {


  return (
    <STable >

          <STableRow className={`${"head"} ${rowPadding && rowPadding} ${border && border} ${borderRad && borderRad}`} >
            {columns.map((col: any, index: number) => (
              <SRowCell key={index} className={`${col.size}`}>
                {col.label}
              </SRowCell>
            ))}
            <SRowCell className={"sm"}>Actions</SRowCell>
          </STableRow>


          {data.map((row: any, rowIndex: number) => (
            <STableRow key={rowIndex} className={`${rowPadding && rowPadding} ${rowIndex % 2 === 0 ? "dark" : "light"} ${border && border} ${borderRad && borderRad}`}>
              {columns.map((col: any, colIndex: number) => (
                <SRowCell key={colIndex} className={`${col.size}`}>
                  {row[col.key]}
                </SRowCell>
              ))}
              <SRowCell className={"sm"}>
                <SLink
                  onClick={() => handleClick({id: row.id, clone_url: row.clone_url})}
                >
                  {actionLabel}
                </SLink>
              </SRowCell>
            </STableRow>
          ))}

    </STable>
  );
};

export default GithubReposDataTable;
