import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createNativeStackNavigator();

import Home from './src/Screens/Home';
import Consulta from './src/Screens/Consulta';

export default function Rotas() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Consulta" component={Consulta} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}