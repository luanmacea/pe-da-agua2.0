import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import Home from "../Screens/Home/index";
import BemVindo from "../Screens/BemVindo/index";
import Login from "../Screens/Login/index";
import SignIn from "../Screens/SignIn/index";

import TabRoutes from "./tab.routes";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
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
        name="bemVindo"
        component={BemVindo}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
          drawerLabel: "Bem vindo",
        }}
      />
      <Drawer.Screen
        name="login"
        component={Login}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="log-in" size={size} color={color} />
          ),
          drawerLabel: "Login",
        }}
      />
      <Drawer.Screen
        name="signIn"
        component={SignIn}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user-plus" size={size} color={color} />
          ),
          drawerLabel: "Sign In",
        }}
      />
    </Drawer.Navigator>
  );
}
