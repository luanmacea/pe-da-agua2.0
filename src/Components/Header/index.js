import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Perfil from "../../assets/i-phone-13-user-icon.png";

import estilos from "./estilos";

export default function Header() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.openDrawer();
  };

  return (
    <View style={estilos.Container}>
      <View style={estilos.ViewHeader}>
        <TouchableOpacity style={estilos.Menu} onPress={handlePress}>
          <Text>Menu</Text>
        </TouchableOpacity>
        <Text style={estilos.Titulo}>Pé D'Água</Text>
        <TouchableOpacity style={estilos.Perfil}>
          <Image source={Perfil} />
        </TouchableOpacity>
      </View>
    </View>
  )
}