// css
import styles from './Dropdown.module.css'

// npm packages
import { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome'

// types
import { DropdownProps } from '../../types/props';

// services
import { formatData } from '../../services/data-modeler';

const Dropdown = ({ isListOpenProp, headerTitleProp, listProp, resetThenSet }: DropdownProps): JSX.Element => {
  const [isListOpen, setIsListOpen] = useState(isListOpenProp)
  const [headerTitle, setHeaderTitle] = useState(headerTitleProp)

  const toggleList = () => {
    setIsListOpen(!isListOpen)
  }

  const closeList = () => {
    setIsListOpen(false)
  }

  const nestedData = formatData(listProp)
  console.log(nestedData);

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

  // useEffect(() => {
  //   setTimeout(() => {
  //     if(isListOpen) {
  //       window.addEventListener('click', closeList)
  //     } else {
  //       window.removeEventListener('click', closeList)
  //     }
  //     console.log("List is open:", isListOpen);
      
  //   }, 0)
  //   console.log("Use effect");
    
  // }, [isListOpen])

  return (  
    <div className={styles.ddWrapper}>
      <button
        type='button'
        className={styles.ddHeader}
        
      >
        <div className={styles.ddHeaderTitle}>{headerTitle}</div>
        {headerTitle !== headerTitleProp 
          ? <div onClick={handleClearSelection}>X</div>
          : ''
        }
        <div className={styles.divider}>|</div>
        {isListOpen 
          ? <FontAwesome className={styles.ddHeaderArrow} name="caret-up" size="2x" onClick={toggleList}/>
          : <FontAwesome className={styles.ddHeaderArrow}name="caret-down" size="2x" onClick={toggleList}/>
        }
      </button>
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