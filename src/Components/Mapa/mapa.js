import React, { useEffect, useState, useRef } from "react";

import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { marcadores, Inicializacao } from "./dados/Marcadores.json";
import { View } from "react-native";

export default function Mapa() {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(MapView);

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
      center: Inicializacao, //centralizar localizacao que eu defini
      zoom: 15,
    });
  }

  return (
    <View>
      {location && (
        <MapView
          ref={mapRef}
          style={{ width: "100%", height: "100%", flex: 1 }}
          // style={estilos.map}
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
    </View>
  );
}
