import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Header from "../../Components/Header";

import estilos from "./estilos";
import { useContext, useEffect } from "react";
import { UsuarioContext } from "../../contexts/loginContext";

export default function TelaBase() {
  const navigation = useNavigation();
  const { Logout, usuario } = useContext(UsuarioContext);

  const handlePressNao = () => {
    navigation.navigate("home");
  };
  const handlePressSim = async () => {
    Logout();
  };
  useEffect(() => {
    if (usuario.login === false) {
      Alert.alert("Volte sempre!");
      navigation.navigate("bemVindo");
    }
  }, [usuario]);
  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      <Header />
      <ScrollView>
        <View style={estilos.ViewBody}>
          <Text style={estilos.Titulo}>Tem certeza que deseja sair?</Text>
          <View style={estilos.ViewBotoes}>
            <TouchableOpacity onPress={handlePressSim} style={estilos.BotaoSim}>
              <Text style={estilos.Texto}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePressNao} style={estilos.BotaoNao}>
              <Text style={estilos.TextoNao}>Não</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
