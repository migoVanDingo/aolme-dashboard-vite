import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SFlexCol } from '../common/containers/FlexContainers'
import Timeline from './Timeline'

const SContainer = styled(SFlexCol)`
    width: 100%;
    box-sizing: border-box;
    padding: 0px;
    border: 1px solid ${({ theme }) => theme.color.color_3};
    padding: 10px 10px 15px;

    &.first{
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    
    }

    &.last{
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
`
const SLabel = styled.h4`
    color: ${({ theme }) => theme.color.color_6};
    width: 100%;

    font-weight: 300;
    padding: 0;
    margin: 0;
    align-items: flex-start;
    margin-bottom: 5px;
`

const LabelTimelineComponent = ({ annotation, color, clase, handleVideoSkipTime }: any) => {

    const [duration, setDuration] = useState<number>()
    const [frames, setFrames] = useState<any>()
    const [sequences, setSequences] = useState<any[]>([])


    useEffect(() => {
        const init = () => {
            console.log("LabelTimelineComponent::annotation::", annotation)

            let seqArr: any[] = []
            let sequences: any[] = []
            const s = annotation['sequences'].map((sequence: any, index: number, array: any) => {
                seqArr.push(sequence)
                if(seqArr.length === 2/*  || index === array.length - 1 */){
                    sequences.push(seqArr)
                    seqArr = []
                }
                
                
            })

            console.log("sequences::", sequences)
            setSequences(sequences)
            setDuration(annotation['duration'])
            setFrames(annotation['frames'])
            
            
        }
        return init()
    }, []);
  return (
    <SContainer className={clase} >
        <SLabel>{annotation.label}</SLabel>
        {/** TIMELINE */}
        <Timeline handleVideoSkipTime={handleVideoSkipTime}  duration={duration} sequences={sequences} color={color}/>
    </SContainer>
  )
}

export default LabelTimelineComponent