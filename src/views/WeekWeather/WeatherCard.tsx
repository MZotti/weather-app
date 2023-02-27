import React, {useEffect, useState} from "react";

import {
    Box,
    Flex,
    HStack,
    PresenceTransition,
    Pressable,
    Text,
    VStack
} from "native-base";
import {CaretDown, CaretUp} from "phosphor-react-native";

import weatherCodes from "@enums/weatherCode";
import weatherIcon from "@functions/weatherIcon";
import dateFormat from "@functions/dateFormat";
import { useLanguage } from "@hooks/language";

interface Props {
    item: weatherItem
    index: number,
    controller: any
}

interface weatherItem {
    date: string,
    weather: number,
    minTemp: number,
    maxTemp: number,
    sunrise: string,
    sunset: string,
}

const WeatherCard = ({item, index, controller}: Props) => {
    const { language } = useLanguage()
    const date = dateFormat(new Date(item.date.slice(0, 10)), 'dd/MM/Y')
    const now = dateFormat(new Date(), 'HH')

    const weatherLabel = weatherCodes.find(we => we.codes.includes(item.weather))?.label
    const weatherTitle = weatherCodes.find(we => we.codes.includes(item.weather))?.title[language]

    const [isOpen, setIsOpen] = useState(false)

    const cardFontColor = (Number(now) >= 4 && Number(now) <= 19) ? '#71717a' : '#f1f5f9';
    const cardBackgroundColor = (Number(now) >= 4 && Number(now) <= 19) ? '#fcd34d' : '#c084fc';

    const handleOpen = () => {
        setIsOpen(!isOpen)
        if (!isOpen) controller.setCardOpen(index)
    }

    useEffect(() => {
        if (controller.cardOpen !== index) setIsOpen(false)
    }, [controller])

    const Fade = ({children}: any) => (
        <PresenceTransition
            visible={isOpen}
            initial={{
                translateY: -100,
                opacity: 0
            }}
            animate={{
                translateY: 0,
                opacity: 1,
                transition: {
                    duration: 300
                }
            }}>
            {children}
        </PresenceTransition>
    )

    return (
        <Box
            backgroundColor={cardBackgroundColor}
            opacity={0.8}
            h={!isOpen ? 24 : 64}
            w="100%"
            borderRadius={16}
        >
            <Pressable onPress={handleOpen}>
                <VStack>
                    <Flex
                        w="100%"
                        h="24"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        px={4}
                        zIndex={2}
                    >
                        <HStack justifyContent="center" alignItems="center" space={4}>
                            <Text fontSize={22} color={cardFontColor}>{date}</Text>
                            {weatherIcon(12, weatherLabel, 42, cardFontColor)}
                        </HStack>
                        {!isOpen ? <CaretDown size={26} color={cardFontColor}/> : <CaretUp size={26} color={cardFontColor} />}
                    </Flex>
                    {
                        isOpen &&
                        <Fade>
                            <Flex
                                px={4}
                                w="full"
                                h="full"
                                flexDirection="row"
                                justifyContent="space-between"
                            >
                                <VStack space={4}>
                                    <Text color={cardFontColor} fontSize={18}>{weatherTitle}</Text>
                                    <Text color={cardFontColor} fontSize={18}>Temperature Minima: {item.minTemp}º</Text>
                                    <Text color={cardFontColor} fontSize={18}>Temperature Maxima: {item.maxTemp}º</Text>
                                </VStack>
                            </Flex>
                        </Fade>
                    }
                </VStack>
            </Pressable>
        </Box>
    )
};

export default WeatherCard;
