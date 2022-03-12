import { createContext, useContext } from 'react';

// @ts-ignore
export const UserContextState = createContext();

// @ts-ignore
export const UserContextDispatch = createContext();

export const useGlobalState = () => useContext(UserContextState);
export const useGlobalDispatch = () => useContext(UserContextDispatch);
