import React from "react";

import {Text, Center, VStack} from 'native-base'
import {Sun} from "phosphor-react-native";

const SplashScreen = ({setAppLoaded}: any) => {

    setTimeout(() => setAppLoaded(true), 3000)

    return (
        <Center h="full" w="full">
            <VStack space={2} justifyContent="center" alignItems="center">
                <Sun size={86} color="#94a3b8"/>
                <Text fontSize={32} color="#94a3b8">Weather APP</Text>
                <Text fontSize={24} color="#94a3b8">by: Marcos Zotti</Text>
            </VStack>
        </Center>
    );
};

export default SplashScreen;
