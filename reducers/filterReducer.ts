export interface FilterState {
  categories: string[];
  areas: string[];
}

export type FilterAction =
  { type: 'TOGGLE_CATEGORY', payload: string } |
  { type: 'REMOVE_CATEGORY', payload: string } |
  { type: 'TOGGLE_AREA', payload: string } |
  { type: 'REMOVE_AREA', payload: string } |
  { type: 'CLEAR_ALL' };

export const initialFilterState: FilterState = { categories: [], areas: [] };

export const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case 'TOGGLE_CATEGORY':
      return { ...state, categories: state.categories.includes(action.payload) ?
          state.categories.filter(category => category !== action.payload) : [...state.categories, action.payload] };
    case 'REMOVE_CATEGORY':
      return { ...state, categories: state.categories.filter(category => category !== action.payload) };
    case 'TOGGLE_AREA':
      return { ...state, areas: state.areas.includes(action.payload) ?
          state.areas.filter(area => area !== action.payload) : [...state.areas, action.payload] };
    case 'REMOVE_AREA':
      return { ...state, areas: state.areas.filter(a => a !== action.payload) };
    case 'CLEAR_ALL':
      return initialFilterState;
  }
}