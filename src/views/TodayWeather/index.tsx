import React from "react";

import { Thermometer } from "phosphor-react-native";

import {useTodayWeather, useWeather} from "@hooks/weather"
import {Box, Center, Spinner, Text, View, VStack} from "native-base";

const TodayWeather = () => {
    const data = useWeather()
    const { isLoading } = useTodayWeather()

    return <View style={{flex: 1}}>
        {
            isLoading
                ? <Spinner />
                : <VStack flex={1}>
                    {
                        data?.weather.map(el => (
                            <Center>
                                <Text color="red">{el.date}</Text>
                                <Text>{el.weather}</Text>
                                <Text>{el.maxTemp}</Text>
                                <Text>{el.minTemp}</Text>
                                <Text>{el.sunrise}</Text>
                                <Text>{el.sunset}</Text>
                            </Center>
                        ))
                    }
                </VStack>
        }
    </View>;
};

export default TodayWeather;
