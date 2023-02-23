import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TodayWeather from '@views/TodayWeather'
import WeekWeather from '@views/WeekWeather'
import { CalendarBlank, Clock, Moon, Sun } from "phosphor-react-native";
import { Alert } from "react-native";
import { HStack, IconButton, useColorMode } from "native-base";

const Tab = createBottomTabNavigator();

export default function Navigator() {
    const { toggleColorMode, colorMode } = useColorMode();

    const menuStyle = {
        headerStyle: {
            backgroundColor: (colorMode == "light") ? '#f5f5f4' : '#1e293b',
        },
        tabBarStyle: {
            backgroundColor: (colorMode == "light") ? '#f5f5f4' : '#1e293b',
        },
        headerTintColor: colorMode == "light" ? '#71717a' : '#f1f5f9',
        headerRight: () => (
            <HStack pr="4">
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
                    }

                    return icon;
                },
                tabBarActiveTintColor: '#38bdf8',
                tabBarInactiveTintColor: (colorMode == "light") ? '#1e293b' : '#f5f5f4',
            })}>
                <Tab.Screen
                    options={{
                        title: 'Hoje',
                        ...menuStyle
                    }} name="Today" component={TodayWeather} />
                <Tab.Screen
                    options={{
                        title: 'Semana',
                        ...menuStyle
                    }} name="Week" component={WeekWeather} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
