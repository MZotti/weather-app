import { useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HStack, IconButton, StatusBar, useColorMode } from "native-base";
import { CalendarBlank, Clock, GearSix, Moon, Sun } from "phosphor-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useLanguage, useLanguageDispatch } from '@hooks/language';
import { ACTION_TYPES as LANGUAGE_TYPES } from "@hooks/language/reducers";
import { useWeatherDispatch } from "@hooks/weather";
import { ACTION_TYPES as WEATHER_TYPES } from "@hooks/weather/reducers";
import TodayWeather from '@views/TodayWeather'
import WeekWeather from '@views/WeekWeather'
import Configuration from "@views/Configuration";
import LocationModal from "@components/LocationModal";
import languages from '@enums/lang/languages';

const Tab = createBottomTabNavigator();

export default function Navigator() {
    const { language } = useLanguage()
    const languageDispatch = useLanguageDispatch()
    const weatherDispatch = useWeatherDispatch()
    const { toggleColorMode, colorMode } = useColorMode();

    useEffect(() => {
        const loadLanguage = async () => {
            const data = await AsyncStorage.getItem('@language')
            if (data) {
                languageDispatch({ type: LANGUAGE_TYPES.CHANGE_LANGUAGE, data: { language: data } })
            }
        }
        const loadLocation = async () => {
            const data = await AsyncStorage.getItem('@location')
            if (data) {
                weatherDispatch({ type: WEATHER_TYPES.CHANGE_LOCATION, data: JSON.parse(data) })
            }
        }

        loadLocation()
        loadLanguage()
    }, [])

    const menuStyle = {
        headerStyle: {
            backgroundColor: (colorMode == "light") ? '#f5f5f4' : '#1e293b',
        },
        tabBarStyle: {
            backgroundColor: (colorMode == "light") ? '#f5f5f4' : '#1e293b',
        },
        headerTintColor: colorMode == "light" ? '#71717a' : '#f1f5f9',
        headerRight: () => (
            <HStack pr="4" space={4}>
                <LocationModal />
                <IconButton
                    variant={"solid"}
                    colorScheme={colorMode == "light" ? "purple" : "orange"}
                    onPress={toggleColorMode}>
                    {colorMode == "light" ? <Moon size={20} color="#FFF" /> : <Sun size={20} color="#FFF" />}
                </IconButton>
            </HStack>
        )
    }

    return (
        <>
            <StatusBar backgroundColor={(colorMode == "light") ? '#f5f5f4' : '#1e293b'} />
            <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let icon;
                        const iconColor = (colorMode == "light") ? '#1e293b' : '#f5f5f4'

                        if (route.name === 'Today') {
                            icon = focused
                                ? <Clock size={24} color={"#38bdf8"} weight="duotone" />
                                : <Clock size={24} color={iconColor} weight="duotone" />;
                        } else if (route.name === 'Week') {
                            icon = focused
                                ? <CalendarBlank size={24} color={"#38bdf8"} weight="duotone" />
                                : <CalendarBlank size={24} color={iconColor} weight="duotone" />;
                        } else if (route.name === 'Configuration') {
                            icon = focused
                                ? <GearSix size={24} color={"#38bdf8"} weight="duotone" />
                                : <GearSix size={24} color={iconColor} weight="duotone" />;
                        }

                        return icon;
                    },
                    tabBarActiveTintColor: '#38bdf8',
                    tabBarInactiveTintColor: (colorMode == "light") ? '#1e293b' : '#f5f5f4',
                })}>
                    <Tab.Screen
                        options={{
                            title: languages.today[language],
                            ...menuStyle
                        }} name="Today" component={TodayWeather} />
                    <Tab.Screen
                        options={{
                            title: languages.week[language],
                            ...menuStyle
                        }} name="Week" component={WeekWeather} />
                    <Tab.Screen
                        options={{
                            title: languages.configurations[language],
                            ...menuStyle
                        }} name="Configuration" component={Configuration} />
                </Tab.Navigator>
            </NavigationContainer>
        </>
    );
}
