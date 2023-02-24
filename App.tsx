import React, {useState} from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NativeBaseProvider, StatusBar, StorageManager, ColorMode  } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';

import WeatherQueryProvider from "@providers/weatherQueryProvider"

import SplashScreen from "@views/SplashScreen";
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
    const [appLoaded, setAppLoaded] = useState(false)

    return (
        <NativeBaseProvider colorModeManager={colorModeManager}>
            <StatusBar />
            <SafeAreaView style={styles.container}>
                {
                    !appLoaded
                        ? <SplashScreen setAppLoaded={setAppLoaded} />
                        : <WeatherQueryProvider>
                            <Navigator />
                        </WeatherQueryProvider>
                }
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