import { SContent } from '../../styled/SOrganization'
import styled from 'styled-components'

const SContainer = styled(SContent)`
    min-height: calc(100vh - 100px);
`

const OrgSettings = () => {
  return(
    <SContainer>OrgSettings</SContainer>
  )
}


export default OrgSettings