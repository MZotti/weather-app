import React from "react";

import {Center, Text, useColorModeValue, VStack} from "native-base";

import FadeOpacity from "@components/FadeOpacity";
import weatherIcon from "@functions/weatherIcon";
import weatherCodes from "@enums/weatherCode";
import { useLanguage } from "@hooks/language";

interface Props {
    weather: weatherItem,
    now: string,
}

interface weatherItem {
    time: string,
    weather: number,
    temperature: number,
    rain: number
}

const CurrentWeather = ({weather, now}: Props) => {
    const { language } = useLanguage()

    const hour = Number(weather?.time.slice(-5).replace(':00', ''))
    const weatherTitle = weatherCodes.find(we => we.codes.includes(weather?.weather))?.title[language]
    const weatherLabel = weatherCodes.find(we => we.codes.includes(weather?.weather))?.label

    const fontAndIconColor = useColorModeValue('#71717a', '#f1f5f9');

    return (
        <FadeOpacity isVisible={true}>
            <Center>
                <VStack space={1}>
                    {weatherIcon(hour, weatherLabel, 128, (Number(now) >= 4 && Number(now) <= 19) ? '#fcd34d' : '#c084fc')}
                    <Center>
                        <Text fontSize={22} color={fontAndIconColor}>{weatherTitle}</Text>
                    </Center>
                    <Center>
                        <Text fontSize={32} color={fontAndIconColor}>{weather.temperature}º</Text>
                    </Center>
                </VStack>
            </Center>
        </FadeOpacity>
    )
};

export default CurrentWeather;
