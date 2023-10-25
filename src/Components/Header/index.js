import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Perfil from "../../assets/i-phone-13-user-icon.png";

import estilos from "./estilos";

export default function Header() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.openDrawer();
  };
  const irHome = () => {
    navigation.navigate("home");
  }
  const handlePerfil = () => {
    navigation.navigate("perfil");
  }

  return (
    <View style={estilos.Container}>
      <View style={estilos.ViewHeader}>
        <TouchableOpacity style={estilos.Menu} onPress={handlePress}>
          <Text style={estilos.Texto}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={irHome}>
          <Text style={estilos.Titulo}>Pé D'Água</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.Perfil} onPress={handlePerfil}>
          <Image source={Perfil} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
