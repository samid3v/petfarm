import { useContext } from "react";
import BoardingContext from "../context";
import ClinicContext from "../context";

export function useClinic() {
     return useContext(ClinicContext);
}