import { useContext } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Header from "../../Components/Header";
import { UsuarioContext } from "../../contexts/loginContext";

import LogoAgua from "../../assets/BemVindo/logo-agua.png";

import estilos from "./estilos";

export default function Perfil() {
  const { usuario } = useContext(UsuarioContext);
  const cepfavorito = usuario.CepsFavoritos;
  const ceps = cepfavorito.split(";");
  const Cep1 = ceps[0];
  const Cep2 = ceps[1];

  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      <Header />
      <ScrollView>
        <View style={estilos.ViewBody}>
          <View style={estilos.ViewHeader}>
            <View style={estilos.LogoAguaView}>
              <Image source={LogoAgua} style={estilos.LogoAguaImage} />
            </View>
            <Text style={estilos.Titulo}>Olá, {usuario.Nome}</Text>
            <Text style={estilos.Legenda}>Visualize suas informações</Text>
          </View>
          <View style={estilos.ViewInformacoes}>
            <View style={estilos.Dados}>
              <Text style={estilos.TituloInformacoes}>Nome:</Text>
              <Text style={estilos.TextoInformacoes}>{usuario.Nome}</Text>
            </View>
            <View style={estilos.Dados}>
              <Text style={estilos.TituloInformacoes}>Email:</Text>
              <Text style={estilos.TextoInformacoes}>{usuario.Email}</Text>
            </View>
            <View style={estilos.Dados}>
              <Text style={estilos.TituloInformacoes}>Telefone:</Text>
              <Text style={estilos.TextoInformacoes}>{usuario.Telefone}</Text>
            </View>
            <View style={estilos.Dados}>
              <Text style={estilos.TituloInformacoes}>Cep 1:</Text>
              <Text style={estilos.TextoInformacoes}>{Cep1}</Text>
            </View>
            <View style={estilos.Dados}>
              <Text style={estilos.TituloInformacoes}>Cep 2:</Text>
              <Text style={estilos.TextoInformacoes}>{Cep2}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
