import {
    createContext,
    useContext,
    useReducer,
    Dispatch,
} from "react";
import { useQuery } from "react-query";
import { ACTION_TYPES, reducer } from "./reducers";

import { GET_TODAY_WEATHER, GET_WEEK_WEATHER } from "@services/weather";
import { todayWeatherBuild, weekWeatherBuild } from "@functions/weatherDataBuild";
import dateFormat from "@functions/dateFormat";

interface Actions {
    type: string;
    value: any;
}

interface InitContextProps {
    state: any,
    dispatch: Dispatch<Actions>,
    location: string,
    lat: number,
    lon: number,
    todayWeather: any[],
    weekWeather: any[]
}

interface Props {
    children: JSX.Element,
}

interface InitialState {
    location: string,
    lat: number,
    lon: number,
    todayWeather: any[],
    weekWeather: any[]
}

const WeatherStateContext = createContext({} as InitContextProps);
const WeatherDispatchContext = createContext({} as InitContextProps);

const initialState: InitialState = {
    location: 'Porto Alegre',
    lat: -29.98,
    lon: -51.19,
    todayWeather: [],
    weekWeather: []
}

const WeatherProvider = ({ children }: Props) => {
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
    const today = dateFormat(new Date(), 'y-MM-d');

    return useQuery(["todayWeather", lat, lon], () => GET_TODAY_WEATHER(lat, lon, today), {
        onSuccess: (data) => {
            const formatData = todayWeatherBuild(data)
            dispatch({ type: ACTION_TYPES.TODAY_WEATHER, data: formatData });
        },
    });
};

const useWeekWeather = () => {
    const dispatch = useWeatherDispatch();
    const { lat, lon } = useWeather()

    return useQuery(["weekWeather", lat, lon], () => GET_WEEK_WEATHER(lat, lon), {
        onSuccess: (data) => {
            const formatData = weekWeatherBuild(data)
            dispatch({ type: ACTION_TYPES.WEEK_WEATHER, data: formatData });
        },
    });
};

export { WeatherProvider, useWeatherDispatch, useWeather, useTodayWeather, useWeekWeather };
