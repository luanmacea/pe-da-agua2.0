import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../Screens/Home/index";
import Perfil from "../Screens/Perfil/index";
import Sair from "../Screens/Sair/index";
import BemVindo from "../Screens/BemVindo/index";
import Login from "../Screens/Login/index";
import SignIn from "../Screens/SignIn/index";
import Teste from "../Screens/@TelaTesteForm/index";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerRoutes from "./drawer.routes";

// const Tab = createBottomTabNavigator();
const AppStack = createNativeStackNavigator()

export default function TabRoutes() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name={"entrar"}
        component={DrawerRoutes}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <AppStack.Screen
        name={"home"}
        component={Home}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <AppStack.Screen
        name={"perfil"}
        component={Perfil}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <AppStack.Screen
        name={"sair"}
        component={Sair}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <AppStack.Screen
        name={"bemVindo"}
        component={BemVindo}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <AppStack.Screen
        name={"login"}
        component={Login}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <AppStack.Screen
        name={"signIn"}
        component={SignIn}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <AppStack.Screen
        name={"teste"}
        component={Teste}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </AppStack.Navigator>
  );
}
