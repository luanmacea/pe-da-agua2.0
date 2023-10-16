import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Header from "../../Components/Header";

import LogoAgua from "../../assets/BemVindo/logo-agua.png";

import estilos from "./estilos";

export default function Consulta() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("home")
  }
  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      <Header />
      <View style={estilos.ViewBody}>
        <View style={estilos.LogoAguaView}>
          <Image source={LogoAgua} style={estilos.LogoAguaImage} />
        </View>
        <Text style={estilos.Titulo}>Seja bem-vindo ao Pé d'água!</Text>
        <Text style={estilos.Legenda}>
          Um sistema de alerta de alagamentos e chuvas fortes
        </Text>
        <TouchableOpacity style={estilos.ViewBotao} onPress={handlePress}>
          <Text style={estilos.TextoBotao}>Consulte sua localização -></Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
