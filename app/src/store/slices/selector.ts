import { RootState } from "../store";

export const selectSelectedValue = (state: RootState, key: string) => {
  return state.dropdownReducer.selectedValues[key] || '';
};
