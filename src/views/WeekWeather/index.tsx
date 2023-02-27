import React, { useState } from "react";

import { Center, ScrollView, Spinner, useColorModeValue, VStack } from "native-base";

import { useWeather, useWeekWeather } from "@hooks/weather"
import WeatherCard from "@views/WeekWeather/WeatherCard";

const WeekWeather = () => {
    const { isLoading } = useWeekWeather()
    const { weekWeather } = useWeather()
    const [cardOpen, setCardOpen] = useState(null)

    const cardsController = {
        cardOpen: cardOpen,
        setCardOpen: setCardOpen
    }

    const currentWeatherBackgroundColor = useColorModeValue('#e7e5e4', '#64748b');

    return (
        <>
            {
                isLoading ?
                    <Center w="100%" flexGrow={4} backgroundColor={currentWeatherBackgroundColor}>
                        <Spinner size="lg" color="coolGray.300" />
                    </Center>
                    :
                    <Center w="100%" flexGrow={4} backgroundColor={currentWeatherBackgroundColor}>
                        <ScrollView w="100%">
                            <VStack space={2} w="100%" py={3} px={6}>
                                {
                                    weekWeather.map((we, x) => <WeatherCard key={x} item={we} index={x} controller={cardsController} />)
                                }
                            </VStack>
                        </ScrollView>
                    </Center>
            }
        </>);
};

export default WeekWeather;
