import React, { useState } from 'react'
import { Box, Button, HStack, Icon, Input, Modal, Pressable, ScrollView, Skeleton, Text, useColorModeValue, VStack } from 'native-base';
import { GET_LOCATION } from '@services/location';
import { useWeather, useWeatherDispatch } from '@hooks/weather';
import { ACTION_TYPES } from '@hooks/weather/reducers';
import { MapPin } from 'phosphor-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '@hooks/language';
import languages from '@enums/lang/languages';

interface Option {
    name: string,
    admin1: string,
    country: string,
    latitude: number,
    longitude: number
}

const LocationModal = () => {
    const { language } = useLanguage()
    const { location } = useWeather()
    const dispatch = useWeatherDispatch();

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState([])

    const textColor = useColorModeValue('#71717a', '#f1f5f9')
    const textLIghtColor = useColorModeValue('#3f3f46', '#94a3b8')

    const handleClose = () => {
        setIsOpen(false)
        setOptions([])
    }

    const handleTextInput = async (value: string) => {
        if (value.length > 3) {
            try {
                setIsLoading(true)
                const data = await GET_LOCATION(value)
                setOptions(data)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
    }

    const handleLocation = async (location: Option) => {
        const values = {
            location: location.name,
            lat: location.latitude,
            lon: location.longitude,
        }
        try {
            dispatch({ type: ACTION_TYPES.CHANGE_LOCATION, data: values })
            handleClose()
            const stringValue = JSON.stringify(values)
            await AsyncStorage.setItem('@location', stringValue)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Button colorScheme={"gray"} variant="outline" onPress={() => setIsOpen(true)} leftIcon={<MapPin size={18} color="#71717a" />}>
                {location}
            </Button>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header color={textColor}>{languages.choseLocationTitle[language]}</Modal.Header>
                    <Modal.Body>
                        <Box w="full" mb={options.length === 0 && !isLoading ? 0 : 4}>
                            <Input
                                InputLeftElement={<Icon as={<MapPin size={20} color="#71717a" />} size={20} ml="2" color="gray.200" />}
                                placeholder={languages.choseLocationPlaceholder[language]}
                                onChangeText={value => handleTextInput(value)} />
                        </Box>
                        <ScrollView maxH={80}>
                            <VStack space={4}>
                                {
                                    isLoading ?
                                        <Pressable
                                            borderWidth={1}
                                            borderColor={'gray.600'}
                                            borderRadius={4}
                                            p={2}
                                            _focus={{
                                                opacity: 0.5,
                                                borderColor: '#FFF'
                                            }}
                                            _pressed={{
                                                opacity: 0.5,
                                                borderColor: '#FFF'
                                            }}
                                        >
                                            <VStack space={2}>
                                                <Skeleton isLoaded={!isLoading} h="4" />
                                                <Skeleton isLoaded={!isLoading} h="4" />
                                            </VStack>
                                        </Pressable>
                                        :
                                        options?.map((opt: Option, x) => (
                                            <Pressable
                                                key={x}
                                                onPress={() => handleLocation(opt)}
                                                borderWidth={1}
                                                borderColor={'gray.600'}
                                                borderRadius={4}
                                                p={2}
                                            >
                                                <VStack space={2}>
                                                    <HStack space={2}>
                                                        <Text color={textColor} fontWeight="bold" >{opt.name}</Text>
                                                        <Text color={textColor}>{opt.admin1}</Text>
                                                    </HStack>
                                                    <HStack space={2}>
                                                        <Text color={textColor}>{opt.country}</Text>
                                                    </HStack>
                                                    <HStack space={2}>
                                                        <Text color={textLIghtColor}>{opt.latitude}º</Text>
                                                        <Text color={textLIghtColor}>{opt.longitude}º</Text>
                                                    </HStack>
                                                </VStack>
                                            </Pressable>
                                        ))
                                }
                            </VStack>
                        </ScrollView>
                    </Modal.Body>
                    <Modal.Footer py={2}>
                        <Button.Group space={1}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={handleClose}>
                                {languages.close[language]}
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default LocationModal