import { useContext } from "react";
import UsersContext from "../context";

export function useUsers() {
     return useContext(UsersContext);
}