import React from "react";

import {Box, Center, ScrollView, Spinner, Text, View, VStack} from "native-base";
import { Thermometer } from "phosphor-react-native";

import {useWeather, useTodayWeather} from "@hooks/weather"
import weatherCodes from "@enums/weatherCode";

const TodayWeather = () => {
    const { todayWeather } = useWeather()
    const { isLoading } = useTodayWeather()

    return (
        <ScrollView>
            <View style={{flex: 1}}>
                {
                    isLoading
                        ? <Spinner />
                        : <VStack flex={1} space={4}>
                            {
                                todayWeather?.map(el => (
                                    <Center key={el.time}>
                                        <Text color="red">{el.time}</Text>
                                        <Text>{weatherCodes.find(we => we.codes.includes(el.weather))?.icon}</Text>
                                        <Text><Thermometer size={16} /> Min {el.temp}</Text>
                                        <Text>{el.rain}</Text>
                                    </Center>
                                ))
                            }
                        </VStack>
                }
            </View>
        </ScrollView>);
};

export default TodayWeather;
