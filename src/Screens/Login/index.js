import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Header from "../../Components/Header";
import estilos from "./estilos";

import Nuvem from "../../assets/Login/nuvem.png";
import Mulher from "../../assets/Login/mulher-sentada.png";

export default function Login() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("signIn");
  };
  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      <Header />
      <ScrollView>
        <View style={estilos.ViewBody}>
          <View style={estilos.Topo}>
            <Text style={estilos.Titulo}>De volta ao</Text>
            <Text style={estilos.Titulo}>Pé D'Água!</Text>
            <View style={estilos.ViewImagens}>
              <Image source={Nuvem} style={estilos.ImgNuvem} />
              <Image source={Mulher} style={estilos.ImgMulher} />
            </View>
          </View>
          <View style={estilos.Formulario}>
            <Text style={estilos.TituloCadastro}>Login</Text>
            <TextInput placeholder="Digite seu E-mail" style={estilos.Input} />
            <TextInput placeholder="Digite sua senha" style={estilos.Input} />
            <View style={estilos.Esqueceu}>
              <Text style={estilos.Texto}>Ainda não possui uma conta?</Text>
              <View style={estilos.EsqueceuCaminho}>
                <Text style={estilos.Texto}>Você pode</Text>
                <TouchableOpacity onPress={handlePress}>
                  <Text style={estilos.TextoEsqueceu}> criar uma conta aqui!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
