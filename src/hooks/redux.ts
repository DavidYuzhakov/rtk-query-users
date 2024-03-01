import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootType, AppDispatch } from "../store";

export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch