import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import {
  SFlexCol,
  SFlexRowWrap
} from "../../common/containers/FlexContainers"

const SContainer = styled(SFlexCol)`
  align-items: flex-start;
  height: 300px;
  width: 380px;
  border: 1px solid ${({ theme }) => theme.color.color_3};
  border-radius: ${({ theme }) => theme.container.borderRadius.lg};
  overflow: hidden;
  box-shadow: 2px 2px 10px ${({ theme }) => theme.color.shadow.dark};
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
`

const SCardTop = styled(SFlexCol)`
  background-color: ${({ theme }) => theme.color.color_0};
  width: 100%;
  height: 1fr;
  align-items: baseline;
  padding: 20px;
  box-sizing: border-box;
`

const SCardBottom = styled(SFlexCol)`
  background-color: ${({ theme }) => theme.color.color_2_5};
  width: 100%;
  height: 100%;
  align-items: baseline;
  padding: 20px;
  box-sizing: border-box;
`
const SName = styled.p`
  color: #2c91b2;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-weight: 500;

  &:hover {
    color: #00bfff;
    cursor: pointer;
  }
`

const SLastUpdated = styled.p`
  padding: 0;
  margin: 5px 0 0 0;
  font-size: 0.8rem;
  font-weight: 200;
  color: ${({ theme }) => theme.color.color_5};
`

const SDescription = styled.p`
  padding: 0;
  margin: 0;
  font-size: 0.95rem;
  line-height: 25px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.color_8};
`

const STagContainer = styled(SFlexRowWrap)`
  padding: 10px;
  gap: 5px;
`
const STag = styled(SFlexCol)`
  width: 40px;
  height: 20px;
  border-radius: ${({ theme }) => theme.container.borderRadius.sm};
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.color_3};
  font-size: 0.7rem;
  font-weight: 100;
  justify-content: center;
`

const DatasetCard = ({ dataset, selectDataset }: any) => {

  const orgName = useSelector((state: any) => state.org.storeOrgName)
  const nav = useNavigate()

  const handleSelectDataset = () => {
    localStorage.setItem("selectedDataset", JSON.stringify(dataset))
    nav("/organization/"+orgName+"/datasets/"+dataset.name,)
  }

  return (
    <SContainer>
      <SCardTop>
        <SName onClick={handleSelectDataset}>{dataset.name}</SName>
        <SLastUpdated>{dataset.updated_by}</SLastUpdated>
        <SLastUpdated>{dataset.updated_at}</SLastUpdated>
      </SCardTop>
      <SCardBottom>
        <SDescription>
          {dataset.description}
        </SDescription>
      </SCardBottom>
    </SContainer>
  )
}

export default DatasetCard
