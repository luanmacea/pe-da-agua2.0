import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Header from "../../Components/Header";
import InputAutocomplete from "../../Components/Mapa/InputAuto";

import estilos from "./estilos";
import { useEffect, useRef, useState } from "react";

import MapView, { Marker } from "react-native-maps";

export default function Login() {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("home");
  };
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const mapRef = useRef(MapView);

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera({
        center: camera.center,
        zoom: 15,
      });
    }
  };

  const onPlaceSelected = (details, flag) => {
    const set = flag === "origin" ? setOrigin : setDestination;
    // console.log(details.geometry.location);
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    console.log(position);
    set(position);
    mapRef.current?.animateCamera({
      center: position, //centralizar localicao que eu defini
      zoom: 15,
    });
    // moveTo(position);
  };
  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      <Header />
      {/* <ScrollView> */}
      <View style={estilos.ViewBody} ref={mapRef}>
        <MapView style={estilos.Mapa} ref={mapRef} >
          {origin && <Marker coordinate={origin} />}
          {destination && <Marker coordinate={destination}  />}
        </MapView>
        <View style={estilos.Search}>
          <InputAutocomplete
            label="origin"
            onPlaceSelected={(details) => {
              onPlaceSelected(details, "origin");
            }}
          />
          <InputAutocomplete
            label="destination"
            onPlaceSelected={(details) => {
              onPlaceSelected(details, "destination");
            }}
          />
        </View>
      </View>
      {/* </ScrollView> */}
    </LinearGradient>
  );
}
