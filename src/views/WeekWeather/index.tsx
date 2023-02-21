import React from "react";

import {Box, Center, Divider, FlatList, HStack, ScrollView, Spinner, Text, View, VStack} from "native-base";
import {Clock, Drop, Thermometer} from "phosphor-react-native";

import {useWeather, useWeekWeather} from "@hooks/weather"
import weatherCodes from "@enums/weatherCode";

const WeekWeather = () => {
    const { weekWeather } = useWeather()
    const { isLoading } = useWeekWeather()

    const renderItem = ({item}) => {
        console.log(typeof item)
        return (
            <HStack space={4} flexDirection="row" justifyContent="space-between">
                <HStack space={2}>
                    <Text fontSize={20}>{item.date}</Text>
                </HStack>
                <HStack space={2}>
                    {weatherCodes.find(we => we.codes.includes(item.weather))?.title}
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
        <ScrollView>
            <Center style={{flex: 1}}>
                {
                    isLoading
                        ? <Spinner size="lg" color="cyan.500" />
                        :
                        <FlatList
                            data={weekWeather}
                            renderItem={renderItem}
                            keyExtractor={item => item.date}
                            ItemSeparatorComponent={<Divider my={4} />}
                        />
                }
            </Center>
        </ScrollView>);
};

export default WeekWeather;
