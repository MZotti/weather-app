import React from "react";
import { ScrollView } from "react-native";

import { Box, Center, Divider, FlatList, HStack, Spinner, Text, VStack } from "native-base";
import { Clock, Drop, Thermometer } from "phosphor-react-native";

import { useWeather, useTodayWeather } from "@hooks/weather"
import weatherCodes from "@enums/weatherCode";
import dateFormat from "@functions/dateFormat";
import weatherIcon from "@functions/weatherIcon";

interface renderProps {
    index: number,
    item: weatherItem,
    separators: any
}

interface weatherItem {
    time: string,
    weather: number,
    temperature: number,
    rain: number
}

const TodayWeather = () => {
    const { todayWeather } = useWeather()
    const { isLoading } = useTodayWeather()

    const now = dateFormat(new Date(), 'HH')
    const currentWeather = todayWeather.find(we => we.time.slice(11, -3) == now)

    const renderCurrentWeather = (weather: weatherItem) => {
        if (!weather) return null

        const hour = Number(weather.time.slice(-5).replace(':00', ''))
        const weatherTitle = weatherCodes.find(we => we.codes.includes(weather.weather))?.title
        const weatherLabel = weatherCodes.find(we => we.codes.includes(weather.weather))?.label

        return (
            <Center>
                <VStack space={1}>
                    {weatherIcon(hour, weatherLabel, 128)}
                    <Center>
                        <Text fontSize={22} color="gray.500" >{weatherTitle}</Text>
                    </Center>
                    <Center>
                        <Text fontSize={32} color="gray.500" >{weather.temperature}º</Text>
                    </Center>
                </VStack>
            </Center>
        )

    }

    const renderItem = (item: weatherItem): JSX.Element => {
        const hour = Number(item.time.slice(-5).replace(':00', ''))
        const weatherLabel = weatherCodes.find(we => we.codes.includes(item.weather))?.label
        const isNow = item.time.slice(11, -3) == now ? true : false

        return (
            <Center h="100%" flexGrow={1} key={item.time} px="8" backgroundColor={isNow ? `gray.200` : 'transparent'}>
                <VStack space={1}>
                    <Center>
                        <Text fontSize={16} color="gray.500" >{item.time.slice(-5)}</Text>
                    </Center>
                    <Center>
                        {weatherIcon(hour, weatherLabel, 32)}
                    </Center>
                    <Center>
                        <Text fontSize={16} color="gray.500" >{item.temperature}º</Text>
                    </Center>
                </VStack>
            </Center>
        )
    }

    return (
        <>
            <Center w="100%" flexGrow={4} backgroundColor="gray.200">
                {
                    renderCurrentWeather(currentWeather)
                }
            </Center>
            <Center w="100%" flexGrow={1} maxHeight="40">
                <ScrollView h="100%" horizontal={true}>
                    <HStack h="100%" space={5} justifyContent="center" alignItems="center">
                        {
                            todayWeather.map(we => (
                                renderItem(we)
                            ))
                        }
                    </HStack>
                </ScrollView>
            </Center>
        </>
    )
};

export default TodayWeather;
