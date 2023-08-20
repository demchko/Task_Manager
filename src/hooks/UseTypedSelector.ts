import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootType} from "../store/store";

export const useTypedSelector: TypedUseSelectorHook<RootType> = useSelector