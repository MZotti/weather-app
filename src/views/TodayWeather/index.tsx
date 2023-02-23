import React from "react";
import {ScrollView} from "react-native";

import {Center, HStack, PresenceTransition, Spinner, Text, useColorModeValue, VStack} from "native-base";

import {useWeather, useTodayWeather} from "@hooks/weather"
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

const Fade = ({duration = 0, children}: any) => (
    <PresenceTransition
        visible={true}
        initial={{
            opacity: 0,
            scale: 0.8
        }}
        animate={{
            opacity: 1,
            scale: 1,
            transition: {
                duration: 200 + (duration * 260)
            }
        }}>
        {children}
    </PresenceTransition>
)

const TodayWeather = () => {
    const {isLoading} = useTodayWeather()
    const {todayWeather} = useWeather()

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
            <Fade>
                <Center>
                    <VStack space={1}>
                        {weatherIcon(hour, weatherLabel, 128, (Number(now) >= 4 && Number(now) <= 19) ? '#fcd34d' : '#9333ea')}
                        <Center>
                            <Text fontSize={22} color={fontAndIconColor}>{weatherTitle}</Text>
                        </Center>
                        <Center>
                            <Text fontSize={32} color={fontAndIconColor}>{weather.temperature}º</Text>
                        </Center>
                    </VStack>
                </Center>
            </Fade>
        )

    }

    const renderItem = (item: weatherItem, index: number): JSX.Element => {
        const hour = Number(item.time.slice(-5).replace(':00', ''))
        const weatherLabel = weatherCodes.find(we => we.codes.includes(item.weather))?.label
        const isNow = item.time.slice(11, -3) == now ? true : false

        const isNowBackgroundColor = useColorModeValue('#e7e5e4', '#1e293b');

        return (
            <Fade duration={index}>
                <Center h="100%" flexGrow={1} key={item.time} px="8"
                        backgroundColor={isNow ? isNowBackgroundColor : 'transparent'}>
                    <VStack space={1}>
                        <Center>
                            <Text fontSize={16} color={fontAndIconColor}>{item.time.slice(-5)}</Text>
                        </Center>
                        <Center>
                            {weatherIcon(hour, weatherLabel, 32, fontAndIconColor)}
                        </Center>
                        <Center>
                            <Text fontSize={16} color={fontAndIconColor}>{item.temperature}º</Text>
                        </Center>
                    </VStack>
                </Center>
            </Fade>
        )
    }

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
                            {
                                renderCurrentWeather(currentWeather)
                            }
                        </Center>
                        <Center w="100%" flexGrow={1} maxHeight="40" backgroundColor={sliderBackgroundColor}>
                            <ScrollView horizontal={true}>
                                <HStack space={5} justifyContent="center" alignItems="center">
                                    {
                                        todayWeather.map((we, x) => (
                                            renderItem(we, x)
                                        ))
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
