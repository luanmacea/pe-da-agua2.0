import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../Screens/Home/index";
import Consulta from "../Screens/BemVindo/index";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home}  />
      <Tab.Screen name="Consulta" component={Consulta} />
    </Tab.Navigator>
  );
}
