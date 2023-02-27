import React from "react";

import {Center, Text, useColorModeValue, VStack} from "native-base";

import FadeOpacity from "@components/FadeOpacity";
import weatherIcon from "@functions/weatherIcon";
import weatherCodes from "@enums/weatherCode";

interface Props {
    item: weatherItem,
    index: number,
    now: string
}

interface weatherItem {
    time: string,
    weather: number,
    temperature: number,
    rain: number
}

const Weather = ({item, index, now}: Props) => {

    const hour = Number(item.time.slice(-5).replace(':00', ''))
    const weatherLabel = weatherCodes.find(we => we.codes.includes(item.weather))?.label
    const isNow = item.time.slice(11, -3) == now ? true : false

    const isNowBackgroundColor = useColorModeValue('#e7e5e4', '#1e293b');
    const fontAndIconColor = useColorModeValue('#71717a', '#f1f5f9');

    return (
        <Center h="100%" flexGrow={1} px="8"
                backgroundColor={isNow ? isNowBackgroundColor : 'transparent'}>
            <FadeOpacity isVisible={true} duration={index} key={item.time}>
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
            </FadeOpacity>
        </Center>
    )
};

export default Weather;
