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

  document.addEventListener('mousedown', closeList)

  return (  
    <div className={styles.ddWrapper} ref={countyMenu}>
      <div className={styles.ddHeader}>
        <input className={styles.headerTitle}type="text" placeholder={headerTitle} />
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
          {nestedData.map((item,idx) => (
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