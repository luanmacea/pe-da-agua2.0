import React, { useEffect, useState, useRef, useContext } from "react";
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

import MapView, { Marker } from "react-native-maps";
import { locationContext } from "../../contexts/locationContext";
import { marcadores } from "./dados/Marcadores.json";

import estilos from "./estilos";
import { UsuarioContext } from "../../contexts/loginContext";
export default function Home() {
  const [temperatura, setTemperatura] = useState("");
  const [textoTemperatura, setTextoTemperatura] = useState("");

  const [umidade, setUmidade] = useState("");
  const [textoUmidade, setTextoUmidade] = useState("");

  const [nivelDeChuva, setNivelDeChuva] = useState("");
  const [textoNivelDeChuva, setTextoNivelDeChuva] = useState("");

  const [Pesquisa, setPesquisa] = useState("");
  const [mostrar, setMostrar] = useState(false);

  const mapRef = useRef(MapView);

  const { usuario } = useContext(UsuarioContext);
  const { location, aceitou, Position } = useContext(locationContext);

  useEffect(() => {
    if (textoTemperatura !== "") {
      console.log("temperatura: ", textoTemperatura);
      console.log("umidade: ", textoUmidade);
      console.log("nivel de chuva: ", textoNivelDeChuva);
    }
  }, [textoTemperatura]);

  useEffect(() => {
    setMostrar(true);
  }, [aceitou, location]);

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
    await moveTo(Position);
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
              {location !== null && (
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
        {aceitou === true && mostrar === true && (
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
              {textoNivelDeChuva === "ChuvaForte" && (
                <Image source={AvisoRuim} style={estilos.ImgInformacoes} />
              )}
              {textoNivelDeChuva === "ChuvaMedia" && (
                <Image source={AvisoAmarelo} style={estilos.ImgInformacoes} />
              )}
              {textoNivelDeChuva === "ChuvaFraca" && (
                <Image source={AvisoBom} style={estilos.ImgInformacoes} />
              )}
              {textoNivelDeChuva === "ChuvaNull" && (
                <Image source={AvisoBom} style={estilos.ImgInformacoes} />
              )}
              <View style={estilos.ViewAvisos}>
                {textoNivelDeChuva === "ChuvaForte" && (
                  <Text style={estilos.TextoAvisos}>
                    Alto risco de alagamento! Com chuvas de: {nivelDeChuva}
                  </Text>
                )}
                {textoNivelDeChuva === "ChuvaMedia" && (
                  <Text style={estilos.TextoAvisos}>
                    Possivel risco de alagamento, cuidado! Com chuvas de:{" "}
                    {nivelDeChuva}
                  </Text>
                )}
                {textoNivelDeChuva === "ChuvaFraca" && (
                  <Text style={estilos.TextoAvisos}>
                    Sem ricos por enquanto! Com chuvas de: {nivelDeChuva}
                  </Text>
                )}
                {textoNivelDeChuva === "ChuvaNull" && (
                  <Text style={estilos.TextoAvisos}>
                    Sem ricos por enquanto! Com chuvas de: {nivelDeChuva}
                  </Text>
                )}
              </View>
            </View>
          )}
          {temperatura !== "" && temperatura !== "Nao encontrado" && (
            <View style={estilos.Informacoes}>
              {textoTemperatura === "TemperaturaAlta" && (
                <Image source={Calor} style={estilos.ImgInformacoes} />
              )}
              {textoTemperatura === "TemperaturaBaixa" && (
                <Image source={Frio} style={estilos.ImgInformacoes} />
              )}
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
