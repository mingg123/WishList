import { combineReducers } from "redux";
import search from "./search";
import wishList from "./wishList";
const rootReducer = combineReducers({ search, wishList });
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
