import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import Home from "../Screens/Home/index";
import Perfil from "../Screens/Perfil/index";
import Sair from "../Screens/Sair/index";
import BemVindo from "../Screens/BemVindo/index";
import Login from "../Screens/Login/index";
import SignIn from "../Screens/SignIn/index";
import Teste from "../Screens/@TelaTesteForm/index";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="bemVindo"
        component={BemVindo}
        options={{
          drawerLabel: "Bem Vindo",
          drawerItemStyle: {
            display: "none",
          }
        }}
      />
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
        name="perfil"
        component={Perfil}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          drawerLabel: "Perfil",
        }}
      />
      <Drawer.Screen
        name="sair"
        component={Sair}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="log-out" size={size} color={color} />
          ),
          drawerLabel: "Sair",
        }}
      />
      <Drawer.Screen
        name="login"
        component={Login}
        options={{
          drawerItemStyle: {
            display: "none",
          },
          drawerLabel: "Login",
        }}
      />
      <Drawer.Screen
        name="signIn"
        component={SignIn}
        options={{
          drawerItemStyle: {
            display: "none",
          },
          drawerLabel: "Sign In",
        }}
      />
      <Drawer.Screen
        name="teste"
        component={Teste}
        options={{
          drawerLabel: "Teste",
          drawerItemStyle: {
            // display: "none",
          },
        }}
      />
    </Drawer.Navigator>
  );
}
