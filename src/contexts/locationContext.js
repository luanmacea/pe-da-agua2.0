import * as Location from "expo-location";
import { createContext, useState } from "react";

export const locationContext = createContext({});

export default function LocationContextProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [Position, setPosition] = useState({
    latitude: -23.535219,
    longitude: -46.768056,
  });
  const [aceitou, setAceitou] = useState(false);

  async function requestLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      setAceitou(true);
      const currentPosition = await Location.getCurrentPositionAsync({});
      console.log("5 pegou localizacao")
      setLocation(currentPosition);
      return true;
    } else {
      return false;
    }
  }

  async function PegandoLocalizacao() {
    const permissao = await requestLocationPermission();
    if (permissao) {
      console.log("7 aceitou permissao")
      return true;
    } else {
      return false;
    }
  }

  return (
    <locationContext.Provider
      value={{ location, Position, PegandoLocalizacao, aceitou, setPosition }}
    >
      {children}
    </locationContext.Provider>
  );
}
