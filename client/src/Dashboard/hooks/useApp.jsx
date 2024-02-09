import { useContext } from "react";
import appContext from "../context/appContext";

export function useApp (){
     return useContext(appContext)
}