export interface IPaySelectedFiltersProps {
    testID?:string
    filters: string[];
    onRemoveFilter: (filter: string) => void;
  }