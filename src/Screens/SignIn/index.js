import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Button
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Header from "../../Components/Header";

import Mulher from "../../assets/SIgnIn/character-4-standing.png";
import Homem from "../../assets/SIgnIn/character-5-standing.png";

import estilos from "./estilos";

export default function Login() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("login");
  };
  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      <Header />
      <ScrollView>
        <View style={estilos.ViewBody}>
          <View style={estilos.Topo}>
            <Text style={estilos.Titulo}>
              Pronto para se juntar ao Pé d’água?
            </Text>
            <View style={estilos.ViewImagens}>
              <Image source={Mulher} style={estilos.ImgMulher} />
              <Image source={Homem} style={estilos.ImgHomem} />
            </View>
          </View>
          <Text style={estilos.TituloCadastro}>Cadastro</Text>
          <TextInput placeholder="Digite seu nome" style={estilos.Input} />
          <TextInput placeholder="Digite seu E-mail" style={estilos.Input} />
          <TextInput placeholder="Digite seu telefone" style={estilos.Input} />
          <TextInput placeholder="Digite sua senha" style={estilos.Input} />
          <TextInput placeholder="CEP favorito 1" style={estilos.Input} />
          <TextInput placeholder="CEP favorito 2" style={estilos.Input} />
          <Button title="Cadastrar" />
          <View style={estilos.Esqueceu}>
            <Text style={estilos.Texto}>Esqueceu sua senha?</Text>
            <View style={estilos.EsqueceuCaminho}>
              <Text style={estilos.Texto}>Você pode</Text>
              <TouchableOpacity onPress={handlePress}>
                <Text style={estilos.TextoEsqueceu}> fazer login aqui!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
