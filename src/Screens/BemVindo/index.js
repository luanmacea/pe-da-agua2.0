import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import Header from "../../Components/Header";
import { LinearGradient } from "expo-linear-gradient";

import LogoAgua from "../../assets/BemVindo/logo-agua.png";

import { UsuarioContext } from "../../contexts/loginContext";
import { locationContext } from "../../contexts/locationContext";

import estilos from "./estilos";

export default function Consulta() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("signIn");
    // console.log("location: ", location);
  };
  const { usuario } = useContext(UsuarioContext);
  const { location, PegandoLocalizacao, setPosition, aceitou } =
    useContext(locationContext);

  useEffect(() => {
    PegandoLocalizacao();
  }, []);

  useEffect(() => {
    if (location !== null) {
      console.log("depois da funcaos", location);
      setPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  }, [location]);

  useFocusEffect(
    React.useCallback(() => {
      if (usuario.login === true) {
        navigation.navigate("home");
      }
    }, [usuario])
  );

  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      {/* <Header /> */}
      <View style={estilos.ViewBody}>
        <View style={estilos.LogoAguaView}>
          <Image source={LogoAgua} style={estilos.LogoAguaImage} />
        </View>
        <Text style={estilos.Titulo}>Seja bem-vindo ao Pé d'água!</Text>
        <Text style={estilos.Legenda}>
          Um sistema de alerta de alagamentos e chuvas fortes
        </Text>
        {aceitou && location !== null && (
          <TouchableOpacity style={estilos.ViewBotao} onPress={handlePress}>
            <Text style={estilos.TextoBotao}>
              Consulte sua localização -{">"}{" "}
            </Text>
          </TouchableOpacity>
        )}
        {aceitou && location === null && (
          <Text style={estilos.TextoEspere}>
            Pegando localização, aguarde....
          </Text>
        )}
        {aceitou && location === null && (
          <Text style={estilos.TextoEspere}>
            (Se demorar muito, reinicie o app)
          </Text>
        )}
      </View>
    </LinearGradient>
  );
}
