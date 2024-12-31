import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../../common/containers/FlexContainers"
import CustomSelect from "../../../common/inputs/select/CustomSelect"
import Button from "../../../common/buttons/Button"

const SContainer = styled(SFlexCol)`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.color.color_2_5};
  align-items: flex-start;
  padding: 25px;
`

const SButton = styled.button`
    width: 150px;
    background-color: ${({ theme }) => theme.color.color_3};
    border: none;
    border-radius: 50%;
    cursor: pointer;
    `

const SButtonContainer = styled(SFlexRow)`
    width: 100%;
    justify-content: flex-end;
    margin-top: 10px;
    gap: 10px;
    `

const AddStage = ({ stageOptions }: any) => {
  return (
    <SContainer>
     
        <CustomSelect options={stageOptions} label="Select Stage File" />
        <SButtonContainer>
            <Button className={"add-stage"} innerHtml={"Cancel"}/>
            <Button className={"add-stage"} innerHtml={"Save Stage"}/>
        </SButtonContainer>
        
        
    </SContainer>
  )
}

export default AddStage
