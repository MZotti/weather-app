import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NativeBaseProvider, StorageManager, ColorMode } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';

import WeatherQueryProvider from "@providers/weatherQueryProvider"

import Navigator from "./src/Navigator";

const colorModeManager: StorageManager = {
    get: async () => {
        try {
            let val = await AsyncStorage.getItem('@color-mode');
            return val === 'dark' ? 'dark' : 'light';
        } catch (e) {
            return 'light';
        }
    },
    set: async (value: ColorMode) => {
        try {
            await AsyncStorage.setItem('@color-mode', String(value));
        } catch (e) {
            console.log(e);
        }
    },
};

export default function App() {
    return (
        <NativeBaseProvider colorModeManager={colorModeManager}>
            <SafeAreaView style={styles.container}>
                <WeatherQueryProvider>
                    <Navigator />
                </WeatherQueryProvider>
            </SafeAreaView>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
});