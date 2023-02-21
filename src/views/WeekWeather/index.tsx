import React from "react";

import {Box, Center, ScrollView, Spinner, Text, View, VStack} from "native-base";
import { Thermometer } from "phosphor-react-native";

import {useWeather, useWeekWeather} from "@hooks/weather"
import weatherCodes from "@enums/weatherCode";

const WeekWeather = () => {
    const { weekWeather } = useWeather()
    const { isLoading } = useWeekWeather()

    return (
        <ScrollView>
            <View style={{flex: 1}}>
                {
                    isLoading
                        ? <Spinner />
                        : <VStack flex={1} space={4}>
                            {
                                weekWeather?.map(el => (
                                    <Center key={el.date}>
                                        <Text color="red">{el.date}</Text>
                                        <Text>{weatherCodes.find(we => we.codes.includes(el.weather))?.icon}</Text>
                                        <Text><Thermometer size={16} /> Min {el.minTemp}</Text>
                                        <Text><Thermometer size={16} /> Max {el.maxTemp}</Text>
                                        <Text>{el.sunrise}</Text>
                                        <Text>{el.sunset}</Text>
                                    </Center>
                                ))
                            }
                        </VStack>
                }
            </View>
        </ScrollView>);
};

export default WeekWeather;
