import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TodayWeather from '@views/TodayWeather'
import WeekWeather from '@views/WeekWeather'

const Tab = createBottomTabNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Today" component={TodayWeather} />
                <Tab.Screen name="Week" component={WeekWeather} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
