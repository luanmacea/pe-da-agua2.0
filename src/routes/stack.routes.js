import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../Screens/Home/index";
import Consulta from "../Screens/Consulta/index";

import StackRoutes from "./stack.routes";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="home"
        component={Home}
      />
      <Stack.Screen 
        name="consulta"
        component={Consulta}
      />
    </Stack.Navigator>
  );
}
