import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootType } from "../reducers/rootReducer";

export const useTypeSelector: TypedUseSelectorHook<RootType> = useSelector;
