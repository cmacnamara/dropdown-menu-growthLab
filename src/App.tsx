// css
import './App.css'

// npm packages
import { useEffect, useState } from 'react'

// components
import Dropdown from './components/Dropdown/Dropdown'

// services
import { getLocations } from './services/listService.ts'

// types
import { ListProp } from './types/props.ts'

const App: React.FC = () => {
  const [list, setList] = useState<ListProp[]>([])
  
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await getLocations()
      const updatedData: ListProp[] = data.map(datum => {
        return {...datum, selected: false}
      })
      setList(updatedData)
    }
    
    fetchData()
    .catch(console.error)
  }, [])
  
  const resetThenSet = (id, key) => {
    const temp = list.map(item => {
      if(item.id === id) return {...item, selected: true}
      else return {...item, selected: false}
    })
    setList(temp)
  }
  
  return (
    <div className='root'>
      <Dropdown 
        isListOpenProp={false} 
        headerTitleProp={'Please select a county'} 
        listProp={list} 
        resetThenSet={resetThenSet}        
      />
    </div>
  )
}

export default App
