import { combineReducers } from "redux";
import search from "./search";
const rootReducer = combineReducers({ search });
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
