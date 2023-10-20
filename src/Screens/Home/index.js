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
import InputAutocomplete from "../../Components/Mapa/InputAuto";

import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { marcadores, Inicializacao } from "./dados/Marcadores.json";

import estilos from "./estilos";
export default function Home() {
  const [location, setLocation] = useState(null);
  const [Position, setPosition] = useState({
    latitude: Inicializacao.latitude,
    longitude: Inicializacao.longitude,
  });
  const [Pesquisa, setPesquisa] = useState("");

  const [mostrar, setMostrar] = useState(false);
  const mapRef = useRef(MapView);

  async function requestLocationPermission() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const NegocioAwait = async () => {
      const teste = await requestLocationPermission();
      if (teste) {
        watchPositionAsync(
          {
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
            zoomLevel: 15,
          },
          (response) => {
            setLocation(response);
            setPosition({
              latitude: response.coords.latitude,
              longitude: response.coords.longitude,
            });
            setMostrar(true);
          }
        );
      } else {
        setMostrar(true);
      }
    };
    NegocioAwait();
  }, []);

  function centralizarMapaPesquisa() {
    mapRef.current?.animateCamera({
      center: Inicializacao, //centralizar localicao que eu defini
      zoom: 15,
    });
  }
  const moveTo = async (pesquisa) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = pesquisa;
      mapRef.current?.animateCamera({
        center: camera.center,
        zoom: 17,
      });
    }
  };

  const onPlaceSelected = (details) => {
    const pesquisa = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    setPesquisa(pesquisa);
    moveTo(pesquisa);
  };

  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      <Header />
      <View style={estilos.ViewBody}>
        <View style={estilos.Pesquisa}>
          <View style={estilos.Search}>
            <InputAutocomplete
              placeholder="Digite seu Endereço"
              onPlaceSelected={(details) => {
                onPlaceSelected(details);
              }}
            />
          </View>
          {mostrar === true && (
            <MapView
              ref={mapRef}
              style={estilos.Mapa}
              initialRegion={{
                latitude: Position.latitude,
                longitude: Position.longitude,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0121,
              }}
            >
              {location && (
                <Marker coordinate={location.coords} title="Você está aqui!" />
              )}
              {Pesquisa && <Marker coordinate={Pesquisa} title="Endereço pesquisado!" />}
              {marcadores.map((item, index) => (
                <Marker key={index} coordinate={item} title={item.titulo} />
              ))}
            </MapView>
          )}
        </View>
        <ScrollView>
          <View style={estilos.Informacoes}>
            <Text>teste</Text>
            <Text>teste</Text>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
