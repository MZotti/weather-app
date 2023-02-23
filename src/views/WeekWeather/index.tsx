import React from "react";

import { Center, Divider, FlatList, HStack, ScrollView, Spinner, Text, useColorModeValue } from "native-base";
import { Clock, Drop, Thermometer } from "phosphor-react-native";

import { useWeather, useWeekWeather } from "@hooks/weather"
import weatherCodes from "@enums/weatherCode";
import weatherIcon from "@functions/weatherIcon";

interface renderProps {
    index: number,
    item: weatherItem,
    separators: any
}

interface weatherItem {
    date: string,
    weather: number,
    minTemp: number,
    maxTemp: number,
    sunrise: string,
    sunset: string,
}

const WeekWeather = () => {
    const { isLoading } = useWeekWeather()
    const { weekWeather } = useWeather()

    const currentWeatherBackgroundColor = useColorModeValue('#e7e5e4', '#64748b');
    const sliderBackgroundColor = useColorModeValue('#d6d3d1', '#334155');
    const fontAndIconColor = useColorModeValue('#71717a', '#f1f5f9');

    const renderItem = ({ item }: renderProps) => {
        const weatherLabel = weatherCodes.find(we => we.codes.includes(item.weather))?.label

        return (
            <HStack space={4} flexDirection="row" justifyContent="space-between">
                <HStack space={2}>
                    <Text fontSize={20}>{item.date}</Text>
                </HStack>
                <HStack space={2}>
                    {weatherIcon(12, weatherLabel, 32)}
                </HStack>
                <HStack space={2}>
                    <Thermometer size={32} />
                    <Text fontSize={20}>{item.minTemp}</Text>
                </HStack>
                <HStack space={2}>
                    <Thermometer size={32} />
                    <Text fontSize={20}>{item.maxTemp}</Text>
                </HStack>
                <HStack space={2}>
                    <Text fontSize={20}>{item.sunrise}</Text>
                </HStack>
                <HStack space={2}>
                    <Text fontSize={20}>{item.sunset}</Text>
                </HStack>
            </HStack>
        )
    }

    return (
        <>
            {
                isLoading ?
                    <Center w="100%" flexGrow={4} backgroundColor={currentWeatherBackgroundColor}>
                        <Spinner size="lg" color="coolGray.300" />
                    </Center>
                    :
                    <ScrollView>
                        <Center style={{ flex: 1 }}>
                            <FlatList
                                data={weekWeather}
                                renderItem={renderItem}
                                keyExtractor={item => item.date}
                                ItemSeparatorComponent={<Divider my={4} />}
                            />
                        </Center>
                    </ScrollView>

            }
        </>);
};

export default WeekWeather;
