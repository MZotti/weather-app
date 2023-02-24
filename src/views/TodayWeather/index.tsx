import React from "react";
import {ScrollView} from "react-native";

import {Center, HStack, Spinner, useColorModeValue} from "native-base";

import {useWeather, useTodayWeather} from "@hooks/weather"
import CurrentWeather from "@views/TodayWeather/CurrentWeather";
import Weather from "@views/TodayWeather/Weather";
import dateFormat from "@functions/dateFormat";

const TodayWeather = () => {
    const {isLoading} = useTodayWeather()
    const {todayWeather} = useWeather()

    const now = dateFormat(new Date(), 'HH')
    const currentWeather = todayWeather.find(we => we.time.slice(11, -3) == now)

    const currentWeatherBackgroundColor = useColorModeValue('#e7e5e4', '#64748b');
    const sliderBackgroundColor = useColorModeValue('#d6d3d1', '#334155');

    return (
        <>
            {
                isLoading ?
                    <Center w="100%" flexGrow={4} backgroundColor={currentWeatherBackgroundColor}>
                        <Spinner size="lg" color="coolGray.300"/>
                    </Center>
                    :
                    <>
                        <Center w="100%" flexGrow={4} backgroundColor={currentWeatherBackgroundColor}>
                            <CurrentWeather weather={currentWeather} now={now}/>
                        </Center>
                        <Center w="100%" flexGrow={1} maxHeight="40" backgroundColor={sliderBackgroundColor}>
                            <ScrollView horizontal={true}>
                                <HStack space={5} justifyContent="center" alignItems="center">
                                    {
                                        todayWeather.map((we, x) => <Weather key={x} item={we} index={x} now={now}/>)
                                    }
                                </HStack>
                            </ScrollView>
                        </Center>
                    </>
            }
        </>
    )
};

export default TodayWeather;
