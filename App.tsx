import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NativeBaseProvider, StatusBar, View } from "native-base";

import WeatherQueryProvider from "@providers/weatherQueryProvider"

import Navigator from "./src/Navigator";
export default function App() {
    return (
        <NativeBaseProvider>
            <StatusBar />
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