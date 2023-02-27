import React, { useState } from 'react'

import { Box, CheckIcon, FormControl, Select, Text, useColorModeValue, VStack } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useLanguage, useLanguageDispatch } from '@hooks/language'
import { ACTION_TYPES } from '@hooks/language/reducers'
import languages from '@enums/lang/languages'
import { Check } from 'phosphor-react-native'

const Configuration = () => {
    const { language } = useLanguage()
    const dispatch = useLanguageDispatch()
    const [lang, setLang] = useState(language || 'en')

    const textColor = useColorModeValue('#71717a', '#f1f5f9')
    const currentWeatherBackgroundColor = useColorModeValue('#e7e5e4', '#64748b');

    const handleSelect = async (value: string) => {
        try {
            await AsyncStorage.setItem('@language', value)
            dispatch({ type: ACTION_TYPES.CHANGE_LANGUAGE, data: { language: value } })
            setLang(value)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Box w="100%" flexGrow={4} backgroundColor={currentWeatherBackgroundColor}>
            <VStack space={2} w="100%" py={3} px={6}>
                <FormControl>
                    <FormControl.Label ><Text color={textColor} fontSize={'md'}>{languages.languageTitle[language]}</Text></FormControl.Label>
                    <Select
                        selectedValue={lang}
                        placeholder={languages.languagePlaceHolder[language]}
                        _selectedItem={{
                            bg: "#38bdf8",
                            endIcon: <Check size="25" color={'#FFF'} />
                        }}
                        mt={1}
                        colorScheme={'gray'}
                        borderColor={textColor}
                        onValueChange={itemValue => handleSelect(itemValue)}
                    >
                        <Select.Item label="English" value="en" />
                        <Select.Item label="Português (BR)" value="pt-br" />
                    </Select>
                </FormControl>
            </VStack>
        </Box>
    )
}

export default Configuration