import { useEffect, useMemo, useState } from "react"

export const useMapTree = (data: any) => {
  const [mapTree, setMapTree] = useState<any>(null)
  const [rootDescription, setRootDescription] = useState<any>(null)
  const [folderOpen, setFolderOpen] = useState<any>({})
  const [selectedNode, setSelectedNode] = useState<string>("")
  const folderOrder = [
    "cohort",
    "level",
    "school",
    "quality",
    "date",
    "group_name",
    "video_name",
  ]

  useEffect(() => {
    return () => {
      const { desc, preTree } = buildRootDescription(data.formData)
      
      const uniqueColumnValues = gatherUniqueColumnValues(preTree, data.groups)
      const folderNodes = createFolderNodes(data.formData, preTree)
      const fileNodes = createFileNodes(folderNodes,data.groups)

      const folderTree = mapFolderChildren(fileNodes)
      const fullTree = mapFileChildren(folderTree, data.groups, preTree)

      console.log('fullTree: ', fullTree)
      setRootDescription(desc)
      setMapTree(fullTree)
      setFolderOpen(
        fullTree.reduce((acc: any, field: any) => {
          acc[field.index] = field.isOpen
          return acc
        }, {})
      )
    }
  }, [data])

/*   useEffect(() => {
    return () => {
      if (selectedNode !== "") {
        toggleFolderOpen(selectedNode)
      }
    }
  }, [selectedNode]) */

  const mapFileChildren = (folderTree: any, groups: any, preTree: any) => {
    if (preTree.length !== 0) {
    } else {
      folderTree[folderTree.length - 1].children = groups.map((group: any) => group.video_name)
    }

    return folderTree
  }

  const mapFolderChildren = (folderNodes: any) => {
    folderNodes.forEach((item: any, index: number, arr: any) => {
      if (index + 1 < arr.length && item.isFolder) {
        const child = arr[index + 1].index
        item.children.push(child)
      }
    })

    return folderNodes
  }

  const createFileNodes = (folderNodes: any, groups: any) => {
    const fileNodes = groups.map((group: any) => {
      return {
        index: "video_name:" + group.video_name,
        key: "video_name",
        value: group.video_name,
        link: group.link,
        isOpen: true,
        isFolder: false,
      }
    })

    return [
      ...folderNodes,
      ...fileNodes
    ]
  }

  const createFolderNodes = (formData: any, uniqueColumnValues: any) => {
    //For each column in the matrix, create a folder node
    let baseFolder: any[] = []
    folderOrder.forEach((key: string) => {
      const k = key === "group_name" ? "group" : key
      if (formData[k] && formData[k] !== "") {
        baseFolder.push({
          index: k + ":" + formData[k],
          key: k,
          value: formData[k],
          children: [],
          isOpen: true,
          isFolder: true,
        })
      }
    })

    uniqueColumnValues.forEach((columnArr: any) => {
      const columnKey = Object.keys(columnArr)[0]
      const columnValues = columnArr[columnKey]

      columnValues.forEach((value: any) => {
        baseFolder.push({
          index: columnKey + ":" + value,
          key: columnKey,
          value: value,
          children: [],
          isOpen: true,
          isFolder: true,
        })
      })
    })

    return baseFolder
  }

  const gatherUniqueColumnValues = (preTree: any, groups: any) => {
    const uniqueValues = preTree.map((key: string) => {
      return {
        [key]: [...new Set(groups.map((group: any) => group[key]).sort())],
      }
    })
    return uniqueValues
  }

  const buildRootDescription = (formData: any) => {
    let desc = []
    let preTree = []
    for (const [key, value] of Object.entries(formData)) {
      const k = key === "group" ? "group_name" : key
      if (value === "") {
        preTree.push(k)
      } else {
        desc.push({ [k]: value })
      }
    }

    return { desc, preTree }
  }

  const toggleFolderOpen = (nodeIndex: string) => {
    const newFolderOpen = { ...folderOpen }
    delegateTreeAction(nodeIndex, newFolderOpen, mapTree)
  }

  const delegateTreeAction = (
    nodeIndex: any,
    newFolderOpen: any,
    tree: any
  ) => {

    //Check if Parent is Open
    const parent = findParent(nodeIndex, mapTree)
    if (newFolderOpen[parent.index]) {

      //Parent Open Close Parent
      let { nfo, children } = closeParent(nodeIndex, newFolderOpen)

      if (children.length > 0) {
        //Then close children
        nfo = closeChildren(children, nfo, tree)
      }

      setFolderOpen(nfo)
    } else {
      //Parent Closed, open parent
      console.log('openParent')
      let { nfo, children } = openParent(nodeIndex, newFolderOpen)

      //Open immediate children
      if (children.length > 0) {
        nfo = openChildren(children, nfo)
      }
      setFolderOpen(nfo)
    }

    setSelectedNode(nodeIndex)
  }

  const openParent = (nodeIndex: string, newFolderOpen: any) => {
    const parent = findParent(nodeIndex, mapTree)
    newFolderOpen[parent.index] = true

    return { nfo: newFolderOpen, children: parent["children"] }
  }

  const openChildren = (children: any[], newFolderOpen: any) => {
    children.forEach((child: any) => {
      newFolderOpen[child] = true
    })

    return newFolderOpen
  }

  const closeParent = (nodeIndex: string, newFolderOpen: any) => {
    const parent = findParent(nodeIndex, mapTree)
    newFolderOpen[parent.index] = false

    return { nfo: newFolderOpen, children: parent["children"] }
  }

  const closeChildren = (children: any[], newFolderOpen: any, tree: any) => {

    //Check if children are open and close them
    children.forEach((child: any) => {
      newFolderOpen[child] = false

      const parent = findParent(child, tree)
      if (parent.children.length > 0 && !parent.index.includes("group")) {
        closeChildren(parent.children, newFolderOpen, tree)
      }
    })

    return newFolderOpen
  }

  const findParent = (nodeIndex: string, tree: any) => {
    return tree.find((node: any) => node.index === nodeIndex)
  }

  const toggleFolderAndChildren = (node: any, newFolderOpen: any) => {
    //Get the node from the newFolderOpen object
  }

  return {
    mapTree,
    rootDescription,
    folderOpen,
    toggleFolderOpen,
    selectedNode,
    setSelectedNode,
  }
}
