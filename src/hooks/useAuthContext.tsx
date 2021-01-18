import { useContext } from "react";
import { AuthContext } from "../components/auth-context-provider";
import { IAuthReducerTuple } from "../components/auth-context-provider/AuthContextProvider";

const useAuthContext = (): IAuthReducerTuple => {
  return useContext(AuthContext);
};

export default useAuthContext;
