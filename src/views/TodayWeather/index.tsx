import React from "react";
import { ScrollView } from "react-native";

import { Box, Center, Divider, FlatList, HStack, Spinner, Text, useColorMode, useColorModeValue, VStack } from "native-base";
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
    
    const currentWeatherBackgroundColor = useColorModeValue('#e7e5e4', '#64748b');
    const sliderBackgroundColor = useColorModeValue('#d6d3d1', '#334155');
    const fontAndIconColor = useColorModeValue('#71717a', '#f1f5f9');

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
                    {weatherIcon(hour, weatherLabel, 128, (Number(now) >= 4 && Number(now) <= 19) ? '#fcd34d' : '#9333ea')}
                    <Center>
                        <Text fontSize={22} color={fontAndIconColor} >{weatherTitle}</Text>
                    </Center>
                    <Center>
                        <Text fontSize={32} color={fontAndIconColor} >{weather.temperature}º</Text>
                    </Center>
                </VStack>
            </Center>
        )

    }

    const renderItem = (item: weatherItem): JSX.Element => {
        const hour = Number(item.time.slice(-5).replace(':00', ''))
        const weatherLabel = weatherCodes.find(we => we.codes.includes(item.weather))?.label
        const isNow = item.time.slice(11, -3) == now ? true : false

        const isNowBackgroundColor = useColorModeValue('#a8a29e', '#1e293b');

        return (
            <Center h="100%" flexGrow={1} key={item.time} px="8" backgroundColor={isNow ? isNowBackgroundColor : 'transparent'}>
                <VStack space={1}>
                    <Center>
                        <Text fontSize={16} color={fontAndIconColor} >{item.time.slice(-5)}</Text>
                    </Center>
                    <Center>
                        {weatherIcon(hour, weatherLabel, 32, fontAndIconColor)}
                    </Center>
                    <Center>
                        <Text fontSize={16} color={fontAndIconColor} >{item.temperature}º</Text>
                    </Center>
                </VStack>
            </Center>
        )
    }

    return (
        <>
            <Center w="100%" flexGrow={4} backgroundColor={currentWeatherBackgroundColor}>
                {
                    renderCurrentWeather(currentWeather)
                }
            </Center>
            <Center w="100%" flexGrow={1} maxHeight="40" backgroundColor={sliderBackgroundColor}>
                <ScrollView horizontal={true}>
                    <HStack space={5} justifyContent="center" alignItems="center">
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
