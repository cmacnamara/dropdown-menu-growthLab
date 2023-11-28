// css
import styles from './Dropdown.module.css'

// npm packages
import { useState } from 'react';

interface DropdownProps {
  isListOpenProp: boolean;
  headerTitleProp: string;
  listProp: object;
}

const Dropdown = ({ isListOpenProp, headerTitleProp, listProp }: DropdownProps): JSX.Element => {
  const [isListOpen, setIsListOpen] = useState(isListOpenProp)
  const [headerTitle, setHeaderTitle] = useState(headerTitleProp)
  const [list, setList] = useState(listProp)

  return (  
    <div className={styles.ddWrapper}>

    </div>
  );
}

export default Dropdown;