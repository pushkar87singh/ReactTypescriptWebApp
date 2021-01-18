import useAuthContext from "./useAuthContext";
import { Permission } from "../components/auth-context-provider";

export const useHasPermission = (permission?: Permission) =>
  useAuthContext()[2].hasPermission(permission);
