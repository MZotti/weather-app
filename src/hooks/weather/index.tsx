import {
    useState,
    createContext,
    useContext,
    useReducer,
    Dispatch,
} from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { ACTION_TYPES, reducer } from "./reducers";

import { GET_TODAY_WEATHER } from "@services/weather";
import dailyWeatherBuild from "@functions/dailyWeatherBuild";

interface Actions {
    type: string;
    value: any;
}

interface InitContextProps {
    state: any;
    dispatch: Dispatch<Actions>;
    lat: number,
    lon: number,
    weather: any[]
}

interface Props {
    children: JSX.Element,
}

interface InitialState {
    lat: number,
    lon: number
    weather: any[]
}

const WeatherStateContext = createContext({} as InitContextProps);
const WeatherDispatchContext = createContext({} as InitContextProps);

const initialState: InitialState = {
    lat: -30.03,
    lon: -51.23,
    weather: []
}
const WeatherProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return (
        <WeatherStateContext.Provider value={{ ...state }}>
            <WeatherDispatchContext.Provider value={value}>
                {children}
            </WeatherDispatchContext.Provider>
        </WeatherStateContext.Provider>
    );
};

const useWeatherDispatch = () => {
    const { dispatch } = useContext(WeatherDispatchContext);

    if (dispatch === undefined)
        throw new Error("useDispatch must be used within a WeatherProvider");

    return dispatch;
};

const useWeather = () => {
    const context = useContext(WeatherStateContext);

    if (!context)
        throw new Error("useWeather must be used within an WeatherProvider");

    return context;
};

const useTodayWeather = () => {
    const dispatch = useWeatherDispatch();
    const { lat, lon } = useWeather()

    return useQuery("weather", () => GET_TODAY_WEATHER(lat, lon), {
        onSuccess: (data) => {
            const formatData = dailyWeatherBuild(data)
            dispatch({ type: ACTION_TYPES.TODAY_WEATHER, data: formatData });
        },
    });
};

export { WeatherProvider, useWeather, useTodayWeather };
