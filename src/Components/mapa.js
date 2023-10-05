import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Geocoder from "react-native-geocoding";

export default function Map({ onLocationSelect }) {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [mapRegion, setMapRegion] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  Geocoder.init("AIzaSyD04y6Ip4Gu5lnlO894XGdf3rOA6BhGxow");

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setMapRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setMarkerPosition({
          latitude,
          longitude,
        });
        onLocationSelect({
          latitude,
          longitude,
        });
      } else {
        console.error("Permission to access location was denied");
      }
    };

    getCurrentLocation();
  }, []);

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };

  // Função para geocodificar o endereço
  const handleGeocodeAddress = async () => {
    try {
      const result = await Geocoder.from(selectedAddress);
      const { lat, lng } = result.results[0].geometry.location;

      setMapRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setMarkerPosition({
        latitude: lat,
        longitude: lng,
      });

      // Chame onLocationSelect com as coordenadas
      onLocationSelect({ latitude: lat, longitude: lng });
    } catch (error) {
      console.error("Erro ao geocodificar o endereço", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Renderize o mapa */}
      {mapRegion && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={mapRegion}
          showsUserLocation={true}
        >
          {markerPosition && <Marker coordinate={markerPosition} />}
        </MapView>
      )}

      {/* Renderize a entrada de endereço */}
      <TextInput
        placeholder="Digite seu endereço..."
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
          padding: 5,
        }}
        onChangeText={handleAddressChange}
        value={selectedAddress}
      />

      {/* Renderize o botão para geocodificar o endereço */}
      <Button title="Geocodificar Endereço" onPress={handleGeocodeAddress} />
    </View>
  );
}
