import { useContext } from "react";
import BoardingContext from "../context";

export function useBoarding() {
     return useContext(BoardingContext);
}