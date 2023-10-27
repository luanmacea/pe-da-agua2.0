import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
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

import UmidadeAlta from "../../assets/Home/umidade/UmidadeAlta.png";
import UmidadeBaixa from "../../assets/Home/umidade/UmidadeBaixa.png";
import UmidadeBoa from "../../assets/Home/umidade/UmidadeBoa.png";

import Calor from "../../assets/Home/Temperatura/Calor.png";
import Boa from "../../assets/Home/Temperatura/boa.png";
import Frio from "../../assets/Home/Temperatura/Frio.png";

import Estrela from "../../assets/Home/estrela.png";

import MapView, { Marker } from "react-native-maps";
import { marcadores } from "./dados/Marcadores.json";

import { locationContext } from "../../contexts/locationContext";
import { UsuarioContext } from "../../contexts/loginContext";

import { pegarDadosCep } from "../../servicos/requisicoes/validacoes";
import { geocodeAsync } from "expo-location";

import estilos from "./estilos";
export default function Home() {
  const [temperatura, setTemperatura] = useState("");
  const [textoTemperatura, setTextoTemperatura] = useState("");

  const [umidade, setUmidade] = useState("");
  const [textoUmidade, setTextoUmidade] = useState("");

  const [nivelDeChuva, setNivelDeChuva] = useState("");
  const [textoNivelDeChuva, setTextoNivelDeChuva] = useState("");

  const [Pesquisa, setPesquisa] = useState("");
  const [mostrar, setMostrar] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [valorSelecionado, setValorSelecionado] = useState(null);

  const mapRef = useRef(MapView);

  const { usuario } = useContext(UsuarioContext);
  const { location, aceitou, Position } = useContext(locationContext);

  const cepfavorito = usuario.CepsFavoritos;
  const ceps = cepfavorito.split(";");
  const Cep1 = ceps[0];
  const Cep2 = ceps[1];

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
  const lidandoCep = async (cep) => {
    const response = await pegarDadosCep(cep);
    const responseCord = await geocodeAsync(response);
    const pesquisa = {
      latitude: responseCord[0].latitude,
      longitude: responseCord[0].longitude,
    };
    setPesquisa(pesquisa);
    moveTo(pesquisa);
    ObtendoInfo(pesquisa);
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
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={Estrela} style={estilos.Estrela} />
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={estilos.Texto}>Selecione um CEP</Text>
                  <Picker
                    selectedValue={valorSelecionado}
                    onValueChange={(itemValue, itemIndex) => {
                      if (itemValue !== valorSelecionado) {
                        setValorSelecionado(itemValue);
                        lidandoCep(itemValue);
                        setModalVisible(false);
                      }
                    }}
                  >
                    <Picker.Item label={Cep1} value={Cep1} />
                    <Picker.Item label={Cep2} value={Cep2} />
                  </Picker>
                  <TouchableOpacity
                    style={estilos.Botao}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
              {textoTemperatura === "TemperaturaBoa" && (
                <Image source={Boa} style={estilos.ImgInformacoes} />
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
              {textoUmidade === "UmidadeAlta" && (
                <Image source={UmidadeAlta} style={estilos.ImgInformacoes} />
              )}
              {textoUmidade === "UmidadeBoa" && (
                <Image source={UmidadeBoa} style={estilos.ImgInformacoes} />
              )}
              {textoUmidade === "UmidadeBaixa" && (
                <Image source={UmidadeBaixa} style={estilos.ImgInformacoes} />
              )}
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
