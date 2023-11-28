export interface ListProp {
  id: number;
  name: string;
  level: string;
  parent: number;
  selected: boolean;
}

export interface DropdownProps {
  isListOpenProp: boolean;
  headerTitleProp: string;
  listProp: ListProp[];
  resetThenSet: (id: number, level: string) => void;
}

