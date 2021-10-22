import { combineReducers } from "redux";

import { currentUser } from "./currentUser";
import { counterReducer } from "./counter";
import { openReducer } from './openReducer';
import { isUpdateReducer } from './isUpdateReducer'
import { idReducer } from "./idReducer";
import { responseReducer } from "./responseReducer";
import { filterReducer } from "./filterReducer";
import { paginationReducer } from "./paginationReducer";
import { dataBindingReducer } from './dataBindingReducer'
export const rootReducer = combineReducers({
    currentUser,
    counterReducer,
    openReducer,
    isUpdateReducer,
    idReducer,
    responseReducer,
    filterReducer,
    paginationReducer,
    dataBindingReducer
})

// gộp các reducer lại vào trong 1 cái reducer lớn