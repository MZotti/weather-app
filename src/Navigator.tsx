import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TodayWeather from '@views/TodayWeather'
import WeekWeather from '@views/WeekWeather'
import {CalendarBlank, Clock} from "phosphor-react-native";

const Tab = createBottomTabNavigator();

const navigatorConfig = {
    teste: null
}

export default function Navigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let icon;

                    if (route.name === 'Today') {
                        icon = focused
                            ? <Clock size={24} color={"#38bdf8"} weight="duotone" />
                            : <Clock size={24} color={"#57534e"} weight="duotone" />;
                    } else if (route.name === 'Week') {
                        icon = focused
                            ? <CalendarBlank size={24} color={"#38bdf8"} weight="duotone" />
                            : <CalendarBlank size={24} color={"#57534e"} weight="duotone" />;
                    }

                    return icon;
                },
                tabBarActiveTintColor: '#38bdf8',
                tabBarInactiveTintColor: '#57534e',
            })}>
                <Tab.Screen name="Today" component={TodayWeather} />
                <Tab.Screen name="Week" component={WeekWeather} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
