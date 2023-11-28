// types
import { ListProp } from "../types/props";

const getParent = (rawData: ListProp[], id: number) => {
  return rawData.find(entry => entry.id === id)
}

export const formatData = (rawData: ListProp[]) => {
  const regions = rawData.filter(entry => {
    return entry.parent == null
  })

  const regionsAndStates = regions.map(region => {
    const associatedStates = rawData.filter(entry => {
      return region.id === entry.parent
    })

    return {...region, states: associatedStates}
  })

  const regionsStatesAndCounties = regionsAndStates.map(regionAndStates => {
    const associatedStates = regionAndStates.states.map(state => {
      const associatedCounties = rawData.filter(entry => {
        return state.id === entry.parent
      })
      return {...state, counties: associatedCounties}
    })
    return {...regionAndStates, statesWithCounties: associatedStates}
  })
  
  return regionsStatesAndCounties
}