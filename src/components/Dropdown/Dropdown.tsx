// css
import styles from './Dropdown.module.css'

// npm packages
import { useState } from 'react';
import FontAwesome from 'react-fontawesome'

// types
import { DropdownProps } from '../../types/props';

const Dropdown = ({ isListOpenProp, headerTitleProp, listProp, resetThenSet }: DropdownProps): JSX.Element => {
  const [isListOpen, setIsListOpen] = useState(isListOpenProp)
  const [headerTitle, setHeaderTitle] = useState(headerTitleProp)

  const toggleList = () => {
    setIsListOpen(!isListOpen)
  }

  const selectItem = item => {
    const { name, id, level } = item
    setHeaderTitle(name)
    setIsListOpen(false)
    resetThenSet(id, level)
  }

  return (  
    <div className={styles.ddWrapper}>
      <button
        type='button'
        className={styles.ddHeader}
        onClick={toggleList}
      >
        <div className={styles.ddHeaderTitle}>{headerTitle}</div>
        <div className={styles.divider}>|</div>
        {isListOpen 
          ? <FontAwesome className={styles.ddHeaderArrow} name="caret-up" size="2x" />
          : <FontAwesome className={styles.ddHeaderArrow}name="caret-down" size="2x" />
        }
      </button>
      {isListOpen && (
        <div
          role="list"
          className={styles.ddList}
        >
          {listProp.map((item,idx) => (
            <button
              type='button'
              className={styles.ddListItem}
              key={idx}
              onClick={() => selectItem(item)}
            >
              {item.name}
              {' '}
              {item.selected && <FontAwesome name="check" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;