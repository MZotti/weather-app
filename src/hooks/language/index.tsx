import {
    createContext,
    useContext,
    useReducer,
    Dispatch,
} from "react";

import { reducer } from "./reducers";

interface Actions {
    type: string;
    value: any;
}

interface InitContextProps {
    state: any,
    dispatch: Dispatch<Actions>,
    language: string,
}

interface Props {
    children: JSX.Element,
}

interface InitialState {
    language: string,
}

const LanguageStateContext = createContext({} as InitContextProps);
const LanguageDispatchContext = createContext({} as InitContextProps);

const initialState: InitialState = {
    language: 'pt-br',
}

const LanguageProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return (
        <LanguageStateContext.Provider value={{ ...state }}>
            <LanguageDispatchContext.Provider value={value}>
                {children}
            </LanguageDispatchContext.Provider>
        </LanguageStateContext.Provider>
    );
};

const useLanguageDispatch = () => {
    const { dispatch } = useContext(LanguageDispatchContext);

    if (dispatch === undefined)
        throw new Error("useDispatch must be used within a LanguageProvider");

    return dispatch;
};

const useLanguage = () => {
    const context = useContext(LanguageStateContext);

    if (!context)
        throw new Error("useLanguage must be used within an LanguageProvider");

    return context;
};

export { LanguageProvider, useLanguageDispatch, useLanguage };
