import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Header from "../../Components/Header";

import MapView, { Marker } from "react-native-maps";
import { marcadores, Inicializacao } from "./dados/Marcadores.json";
import Geocoder from "react-native-geocoding";

import NubladoChuva from "../../assets/NubladoChuva.png";
import Trovejando from "../../assets/trovejando.png";
import Chuva from "../../assets/chuva.png";

import estilos from "./estilos";
export default function Home() {
  const [cep, setCep] = useState("");

  const getInitialState = () => {
    return { region: { ...Inicializacao } };
  };

  // const onRegionChange = (region) => {
  //   this.setState({ region });
  //   console.log(region);
  // };

  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      {/* // <View> */}
      <Header />
      <View style={estilos.ViewBody}>
        <View style={estilos.Pesquisa}>
          <TextInput
            placeholder="Digite Seu CEP"
            autoCapitalize="none"
            style={estilos.InputCep}
            value={cep}
            onChangeText={setCep}
          />
          {/* <TouchableOpacity style={estilos.ButtonPesquisar}>
            <Text>Buscar</Text>
          </TouchableOpacity> */}
        </View>
        <MapView
          style={estilos.map}
          initialRegion={getInitialState().region}
          // onRegionChange={this.onRegionChange}
        >
          {marcadores.map((item, index) => (
            <Marker key={index} coordinate={item} title={item.titulo} />
          ))}
        </MapView>
        <View style={estilos.ViewWeather}>
          <Text style={estilos.TituloWeather}>Potential Weather</Text>
          <View style={estilos.ViewPrevisao}>
            <Text style={estilos.TextTemperatura}>27°</Text>
            <View>
              <Text style={estilos.TextDiaSemana}>Monday</Text>
              <Text style={estilos.TextDiaSemana}>15 May 2022</Text>
            </View>
            <Image source={NubladoChuva} />
          </View>
          <View style={estilos.ViewPrevisao}>
            <Text style={estilos.TextTemperatura}>29°</Text>
            <View>
              <Text style={estilos.TextDiaSemana}>Tuesday</Text>
              <Text style={estilos.TextDiaSemana}>15 May 2022</Text>
            </View>
            <Image source={Trovejando} />
          </View>
          <View style={estilos.ViewPrevisao}>
            <Text style={estilos.TextTemperatura}>27°</Text>
            <View>
              <Text style={estilos.TextDiaSemana}>Monday</Text>
              <Text style={estilos.TextDiaSemana}>15 May 2022</Text>
            </View>
            <Image source={Chuva} />
          </View>
        </View>
      </View>
      {/* </View> */}
    </LinearGradient>
  );
}
