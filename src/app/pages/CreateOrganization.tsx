import React, { useState } from "react"
import styled from "styled-components"
import { SFlexCol } from "../components/common/containers/FlexContainers"
import Heading from "../components/common/Heading"
import Message from "../components/common/Message"
import TextInput from "../components/common/inputs/text/TextInput"
import TextArea from "../components/common/inputs/text/TextArea"
import { SButton } from "../components/common/styled"
import LoadingSpinner from "../components/common/loading/LoadingSpinner"
import { ICreateOrganization } from "../utility/interface/organization"
import { useAuth } from "../context/AuthContext"
import { useDispatch, useSelector } from "react-redux"
import { OrganizationAPI } from "../api/OrganizationAPI"
import { setStoreOrganizationId, setStoreOrganizationName } from "../actions"
import { useNavigate } from "react-router-dom"

const SContainer = styled(SFlexCol)`
  width: 650px;
  height: calc(100vh - ${({ theme }) => theme.header.height});
  align-items: baseline;
  padding: 40px 10px;

  &.loading {
    align-items: center;
    justify-content: center;
  }
`

const CreateOrganization = () => {
  const userId = useSelector((state: any) => state.userId)
  
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [orgName, setOrgName] = useState<string>("")
  const [orgDesc, setOrgDesc] = useState<string>("")
  const [orgEmail, setOrgEmail] = useState<string>("")
  const [orgUrl, setOrgUrl] = useState<string>("")
  const [orgAdmin, setOrgAdmin] = useState<string>("")

  const dispatch = useDispatch()
  const nav = useNavigate()

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    const org: ICreateOrganization = {
      name: orgName,
      description: orgDesc,
      email: orgEmail,
      url: "",
      user_id: userId ? userId : orgAdmin,
      user_status: "ACTIVE"
    }
    OrganizationAPI.createOrganization(org)
      .then((result: any) => {
        console.log("Organization: " , result)
        dispatch(setStoreOrganizationName(result.name))
        dispatch(setStoreOrganizationId(result.org_id))
        setIsLoading(false)
        nav("/organization/"+result.org_id)    
      })
      .catch((err: any) => {
        console.error(
          "CreateOrganization.tsx -- handleFormSubmit() Error:",
          err,
        )
      })
  }

  

  return (
    <SContainer className={isLoading ? "loading" : ""}>
      {!isLoading ? (
        <>
          <Heading heading={"Create an Organization"} size={"md"} />
          <Message
            text={"Required fields are marked with an asterisk (*)."}
            size={"sm"}
            italic={"italic"}
          />

          <form
            encType="multipart/form-data"
            id="ful-form"
            onSubmit={handleFormSubmit}
          >
            <TextInput
              setName={setOrgName}
              name={orgName}
              label={"Organization Name"}
            />
            <TextInput
              setName={setOrgEmail}
              name={orgEmail}
              label={"Organization Email"}
            />
          
            {/* <TextInput
              setName={setOrgUrl}
              name={orgUrl}
              label={"Organization Website URL"}
            /> */}
            <TextArea description={orgDesc} setDescription={setOrgDesc} />
            <SButton type="submit" innerHtml={"Create Repository"} />
          </form>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </SContainer>
  )
}

export default CreateOrganization
