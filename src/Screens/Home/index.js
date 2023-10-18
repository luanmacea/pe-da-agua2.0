import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Header from "../../Components/Header";
import Mapa from "../../Components/Mapa/mapa";

import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { marcadores, Inicializacao } from "./dados/Marcadores.json";
import Geocoder from "react-native-geocoding";

import NubladoChuva from "../../assets/NubladoChuva.png";
import Trovejando from "../../assets/trovejando.png";
import Chuva from "../../assets/chuva.png";

import estilos from "./estilos";
export default function Home() {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(MapView);
  const [cep, setCep] = useState("");
  // const mapRef = useRef<MapView>(null);
  // const locationState = useState(null);

  async function requestLocationPermission() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermission();
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
        zoomLevel: 15,
      },
      (response) => {
        setLocation(response);
        // console.log(response.coords.latitude);a
      }
    );
  }, []);

  function centralizarMapaPesquisa() {
    mapRef.current?.animateCamera({
      // pitch: 100,
      // center: response.coords  //centralizar minha localizacao
      center: Inicializacao, //centralizar localizacao que eu defini
      zoom: 15,
    });
  }

  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      <Header />
      {/* <ScrollView style={{ flex: 1 }}> */}
      <View style={estilos.ViewBody}>
        <View style={estilos.Pesquisa}>
          <TextInput
            placeholder="Digite Seu CEP"
            autoCapitalize="none"
            style={estilos.InputCep}
            value={cep}
            onChangeText={setCep}
          />
          <TouchableOpacity
            style={estilos.ButtonPesquisar}
            onPress={centralizarMapaPesquisa}
          >
            <Text>Buscar</Text>
          </TouchableOpacity>
        </View>
        {location && (
          <MapView
            ref={mapRef}
            style={estilos.map}
            // initialRegion={getInitialState().region} // Avenida paulista
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0121,
            }}
          >
            <Marker coordinate={location.coords} title="Você está aqui!" />
            {marcadores.map((item, index) => (
              <Marker key={index} coordinate={item} title={item.titulo} />
            ))}
          </MapView>
        )}
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
      {/* </ScrollView> */}
    </LinearGradient>
  );
}
