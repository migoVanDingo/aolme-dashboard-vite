import React, { useEffect } from 'react'

const SubsetCard = ({subset, dataset}: any) => {
    useEffect(() => {
        console.log("Subset: ", subset)
        console.log("Dataset: ", dataset)
    }, [subset, dataset])
  return (
    <div>SubsetCard</div>
  )
}

export default SubsetCard