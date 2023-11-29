// css
import styles from './Dropdown.module.css'

// npm packages
import { useState, useRef } from 'react';
import FontAwesome from 'react-fontawesome'

// types
import { DropdownProps } from '../../types/props';

// services
import { formatData } from '../../services/data-modeler';

const Dropdown = ({ isListOpenProp, headerTitleProp, listProp, resetThenSet }: DropdownProps): JSX.Element => {
  const [isListOpen, setIsListOpen] = useState(isListOpenProp)
  const [headerTitle, setHeaderTitle] = useState(headerTitleProp)
  const [searchInput, setSearchInput] = useState('')
  const [displayedCounties, setDisplayedCounties] = useState(formatData(listProp))
  const countyMenu = useRef(null)

  const toggleList = () => {
    setIsListOpen(!isListOpen)
  }

  const closeList = (e) => {
    if(countyMenu.current && isListOpen && !countyMenu.current.contains(e.target)) {
      setIsListOpen(false)
    }
  }

  const nestedData = formatData(listProp)

  const selectItem = item => {
    const { name, id, level } = item
    setHeaderTitle(name)
    setIsListOpen(false)
    resetThenSet(id, level)
  }

  const handleClearSelection = () => {
    setIsListOpen(true)
    setHeaderTitle(headerTitleProp)
  }

  const filterCountiesBySearch = (query: string) => {
    const mappedRegions = nestedData.map(region => {
      const mappedStates = region.statesWithCounties.map(state => {
        const filteredCounties = state.counties.filter(county => {
          return county.name.toLowerCase().includes(query.toLowerCase())
        })
        return {...state, counties: filteredCounties}
      })
      const filteredStates = mappedStates.filter(state => {
        return state.counties.length > 0
      })
      return {...region, statesWithCounties: filteredStates}
    })
    const filteredRegions = mappedRegions.filter(region => {
      return region.statesWithCounties.length > 0
    })
    
    return filteredRegions
  }

  const handleSearchChange = e => {
    setSearchInput(e.target.value)
    let filteredCounties;
    if(e.target.value === '') {
      filteredCounties = nestedData
    } else {
      filteredCounties = filterCountiesBySearch(e.target.value)
      if(!isListOpen) setIsListOpen(true)
    }
    
    setDisplayedCounties(filteredCounties)
  }

  document.addEventListener('mousedown', closeList)

  return (  
    <div className={styles.ddWrapper} ref={countyMenu}>
      <div className={styles.ddHeader}>
        <input 
          className={styles.headerTitle}
          type="text" 
          placeholder={headerTitle} 
          onChange={handleSearchChange}
          value={searchInput}
        />
        {headerTitle !== headerTitleProp 
          ? <div className={styles.closeBtn} onClick={handleClearSelection}>X</div>
          : ''
        }
        <div className={styles.menuButtons}>
          <div className={styles.divider}> | </div>
          {isListOpen 
            ? <FontAwesome className={styles.ddHeaderArrow} name="caret-up" size="2x" onClick={toggleList}/>
            : <FontAwesome className={styles.ddHeaderArrow}name="caret-down" size="2x" onClick={toggleList}/>
          }
        </div>
      </div>
      {isListOpen && (
        <div
          role="list"
          className={styles.ddList}
        >
          {displayedCounties.map((item,idx) => (
            <>
              <button
                type='button'
                className={styles.ddListItem}
                key={idx}
              >
                {item.name}
              </button>
              {item.statesWithCounties.map((state,idx) => (
                <>
                  <button
                    type='button'
                    className={styles.ddListItemState}
                    key={idx}
                  >
                    {state.name}
                  </button>
                {state.counties.map((county,idx) => (
                  <button
                    type='button'
                    className={styles.ddListItemCounty}
                    key={idx}
                    onClick={() => selectItem(county)}
                  >
                    {county.name}
                  </button>
                ))}
                </>
              ))}
            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;