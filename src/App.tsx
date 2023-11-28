// css
import './App.css'

// npm packages
import { useEffect, useState } from 'react'

// components
import Dropdown from './components/Dropdown/Dropdown'

// services
import { getLocations } from './services/listService.ts'

// types
import { DropdownProps, ListProp } from './types/props.ts'

const App: React.FC = () => {
  const [list, setList] = useState<ListProp[]>([])
  
  const resetThenSet = (id, key) => {

  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLocations()
      const updatedData = data.map(datum => {
        return {...datum, selected: false}
      })
      setList(updatedData)
    }
    
    fetchData()
      .catch(console.error)
  }, [])
  
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
