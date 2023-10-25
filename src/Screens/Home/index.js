import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Header from "../../Components/Header";
import InputAutocomplete from "../../Components/Mapa/InputAuto";
import { VerificarAreas } from "../../Components/Mapa/ObterInfo";

import AvisoRuim from "../../assets/Home/Alagamento/AvisoRuim.png";
import AvisoAmarelo from "../../assets/Home/Alagamento/AvisoAmarelo.png";
import AvisoBom from "../../assets/Home/Alagamento/AvisoBom.png";

import ChuvaTrovejando from "../../assets/Home/Tempo/ChuvaTrovejando.png";
import Nublado from "../../assets/Home/Tempo/Nublado.png";
import Sol from "../../assets/Home/Tempo/Sol.png";

import Calor from "../../assets/Home/Temperatura/Calor.png";
import Frio from "../../assets/Home/Temperatura/Frio.png";

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
  const [temperatura, setTemperatura] = useState("");
  const [textoTemperatura, setTextoTemperatura] = useState("");

  const [umidade, setUmidade] = useState("");
  const [textoUmidade, setTextoUmidade] = useState("");

  const [nivelDeChuva, setNivelDeChuva] = useState("");
  const [textoNivelDeChuva, setTextoNivelDeChuva] = useState("");

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
          // console.log("posicao dentro funcao2: ", Position);
          setMostrar(true);
        }
      );
      // .then(console.log("tentando: ", Position))
    } else {
      setMostrar(true);
    }
  };

  useEffect(() => {
    // const pegandolocalizacao = async () => {
    NegocioAwait();
    // };
    // pegandolocalizacao();
  }, []);

  const moveTo = async (pesquisa) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = pesquisa;
      mapRef.current?.animateCamera({
        center: camera.center,
        zoom: 16,
      });
    }
  };
  const minhaLocalizacao = async () => {
    moveTo(Position);
    ObtendoInfo(Position);
  };

  const onPlaceSelected = (details) => {
    const pesquisa = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    setPesquisa(pesquisa);
    moveTo(pesquisa);
    ObtendoInfo(pesquisa);
  };
  async function ObtendoInfo(lugar) {
    console.log("*******************************");
    const info = {
      lat: lugar.latitude,
      lng: lugar.longitude,
    };
    console.log("Posicao inicial: ", info);
    VerificarAreas(
      info,
      setNivelDeChuva,
      setTextoNivelDeChuva,
      setUmidade,
      setTextoUmidade,
      setTemperatura,
      setTextoTemperatura
    );
  }

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
          {mostrar === false && (
            <Text style={estilos.Titulo}>Carregando mapa...</Text>
          )}
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
              {Pesquisa && (
                <Marker coordinate={Pesquisa} title="Endereço pesquisado!" />
              )}
              {marcadores.map((item, index) => (
                <Marker key={index} coordinate={item} title={item.titulo} />
              ))}
            </MapView>
          )}
        </View>
        {location && (
          <Button
            title="Pesquisar localização atual"
            onPress={minhaLocalizacao}
          />
        )}
        <ScrollView>
          {umidade === "" && nivelDeChuva === "" && temperatura === "" && (
            <Text style={estilos.TextoAvisos}>
              Pesquise um endereço para aparecer as informações...
            </Text>
          )}
          {umidade == "Nao encontrado" &&
            nivelDeChuva == "Nao encontrado" &&
            temperatura == "Nao encontrado" && (
              <Text style={estilos.TextoAvisos}>
                Não cobrimos essa area, sinto muito...
              </Text>
            )}
          {nivelDeChuva !== "" && nivelDeChuva !== "Nao encontrado" && (
            <View style={estilos.Informacoes}>
              <Image source={AvisoRuim} style={estilos.ImgInformacoes} />
              {/* <Image source={AvisoAmarelo} style={estilos.ImgInformacoes} />
              <Image source={AvisoBom} style={estilos.ImgInformacoes} /> */}
              <View style={estilos.ViewAvisos}>
                <Text style={estilos.TextoAvisos}>
                  Alto risco de alagamento! Com chuvas de: {nivelDeChuva}
                </Text>
              </View>
            </View>
          )}
          {temperatura !== "" && temperatura !== "Nao encontrado" && (
            <View style={estilos.Informacoes}>
              <Image source={ChuvaTrovejando} style={estilos.ImgInformacoes} />
              <View style={estilos.ViewAvisos}>
                <Text style={estilos.TextoAvisos}>
                  Temperatura da regiao: {temperatura}
                </Text>
              </View>
            </View>
          )}
          {umidade !== "" && umidade !== "Nao encontrado" && (
            <View style={estilos.Informacoes}>
              <Image source={Frio} style={estilos.ImgInformacoes} />
              <View style={estilos.ViewAvisos}>
                <Text style={estilos.TextoAvisos}>
                  Umidade da região: {umidade}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
