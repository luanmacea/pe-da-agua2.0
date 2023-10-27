import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

import Header from "../../Components/Header";
import { pegarDadosCep } from "../../servicos/requisicoes/validacoes";

import estilos from "./estilos";

export default function TelaBase() {
  const navigation = useNavigation();
  const [endereco, setEndereco] = useState("");

  const geocode = async () => {
    const response= await pegarDadosCep(endereco);
    const geocodedLocation = await Location.geocodeAsync(response);
  }
  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      <Header />
      <ScrollView>
        <View style={estilos.ViewBody}>
          <Text style={estilos.Titulo}>Texto</Text>
          <TextInput
            style={estilos.Input}
            onChangeText={setEndereco}
            value={endereco}
            placeholder="Digite seu endereço"
          />
          <Button title="Pesquisar" onPress={geocode} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
