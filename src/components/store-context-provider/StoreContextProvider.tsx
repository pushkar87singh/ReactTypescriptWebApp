import React, { ReactNode, createContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { IStoreQueryData, GET_STORE_DATA } from "./DataQuery";
import useAuthContext from "../../hooks/useAuthContext";
import Loader from "../loader";

export interface IStoreContextTuple
  extends Array<IStoreQueryData | React.Dispatch<IStoreQueryData>> {
  0: IStoreQueryData;
  1: React.Dispatch<IStoreQueryData>;
}

export const StoreContext = createContext<IStoreContextTuple>(
  ([] as unknown) as IStoreContextTuple
);

const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  const [store, updateStore] = useState<IStoreQueryData | {} | undefined>(
    undefined
  );
  const [{ user }] = useAuthContext();

  const { loading, data, error } = useQuery<IStoreQueryData>(GET_STORE_DATA, {
    skip: !(user && user.id),
    variables: {
      hasSubscrId: !!(user && user.subscriptionId)
    }
  });

  useEffect(() => {
    if (!loading && data) {
      updateStore(data);
    } else if (!loading && !data) {
      updateStore({}); // to stop Loader for skipped query
    }
  }, [loading, data]);

  return (
    <StoreContext.Provider value={[store, updateStore] as any}>
      <Loader loading={loading} data={store} error={error} errorMessage="error">
        {() => children}
      </Loader>
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
