import {useState} from 'react'
import {hookToRenderProps, hookToHOC} from '../conversion-fns/conversion-fns'

/* A HOC, RenderProps component and hook to manage a list - adding, deleting, updating items */

const updateAtIndex = (array, index, element) => {
  const previousElements = array.slice(0, index)
  const laterElements = array.slice(index + 1)

  return [...previousElements, element, ...laterElements]
}

const removeAtIndex = (array, index) => {
  const previousElements = array.slice(0, index)
  const laterElements = array.slice(index + 1)

  return [...previousElements, ...laterElements]
}

const insertAtIndex = (array, index, element) => {
  const previousElements = array.slice(0, index)
  const laterElements = array.slice(index)

  return [...previousElements, element, ...laterElements]
}

const useList = (initialList = []) => {
  const [list, setList] = useState(initialList)
  const add = (index, element) => {
    setList(list => insertAtIndex(list, index || list.length, element))
  }
  const remove = index => {
    setList(list => removeAtIndex(list, index))
  }
  const update = (index, element) => {
    setList(list => updateAtIndex(list, index, element))
  }
  return {
    list,
    add,
    remove,
    update,
  }
}

/* Render Props: */
// const List = ({render, initialList = []}) => {
//   const listProps = useList(initialList)
//   return render(listProps)
// }

const List = hookToRenderProps(useList)

const withList = hookToHOC(useList)

export {List, withList, useList}
