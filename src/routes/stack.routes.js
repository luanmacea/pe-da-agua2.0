import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../Screens/Home/index";
import BemVindo from "../Screens/BemVindo/index";
import Login from "../Screens/Login/index";
import SignIn from "../Screens/SignIn/index";
import Teste from "../Screens/@TelaTesteForm/index";
import Perfil from "../Screens/Perfil/index";

import StackRoutes from "./stack.routes";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="bemVindo" component={BemVindo} />
      <Stack.Screen name="consulta" component={Login} />
      <Stack.Screen name="signIn" component={SignIn} />
      <Stack.Screen name="teste" component={Teste} />
      <Stack.Screen name="perfil" component={Perfil} />
    </Stack.Navigator>
  );
}
