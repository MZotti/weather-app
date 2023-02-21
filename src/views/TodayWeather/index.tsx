import React from "react";

import {Center, Divider, FlatList, HStack, ScrollView, Spinner, Text} from "native-base";
import {Clock, Drop, Thermometer} from "phosphor-react-native";

import {useWeather, useTodayWeather} from "@hooks/weather"
import weatherCodes from "@enums/weatherCode";

const TodayWeather = () => {
    const { todayWeather } = useWeather()
    const { isLoading } = useTodayWeather()

    const renderItem = ({item}) => {
        return (
            <HStack space={4} flexDirection="row" justifyContent="space-between">
                <HStack space={2}>
                    <Clock size={32} />
                    <Text fontSize={20}>{item.time.slice(-5)}</Text>
                </HStack>
                <HStack space={2}>
                    {weatherCodes.find(we => we.codes.includes(item.weather))?.title}
                </HStack>
                <HStack space={2}>
                    <Thermometer size={32} />
                    <Text fontSize={20}>{item.temperature}</Text>
                </HStack>
                <HStack space={2} flexDirection="row" justifyContent="flex-end" alignItems="flex-end">
                    <Drop size={32} />
                    <Text fontSize={20}>{item.rain}</Text>
                </HStack>
            </HStack>
        )
    }

    return (
        <ScrollView>
            <Center w="100%" py={4} style={{flex: 1}}>
                {
                    isLoading
                        ? <Spinner size="lg" color="cyan.500" />
                        :
                        <FlatList
                            data={todayWeather}
                            renderItem={renderItem}
                            keyExtractor={item => item.time}
                            ItemSeparatorComponent={<Divider my={4} />}
                        />
                }
            </Center>
        </ScrollView>
    );
};

export default TodayWeather;
