import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import Home from "../Screens/Home/index";
import Consulta from "../Screens/BemVindo/index";

import TabRoutes from "./tab.routes";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="home"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          drawerLabel: "Início",
        }}
      />
      <Drawer.Screen 
        name="consulta"
        component={Consulta}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
          drawerLabel: "Pesquisar",
        }}
      />
    </Drawer.Navigator>
  );
}
