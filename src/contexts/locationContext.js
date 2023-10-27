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
    console.log("2 dentro do pegando permissao")
    // const { granted } = await Location.requestForegroundPermissionsAsync();
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log("3 saiu do pegando permissao")
    if (status === "granted") {
      console.log("4 permissao aceita")
      // const currentPosition = await Location.getCurrentPositionAsync();
      const location = await Location.getCurrentPositionAsync({});
      console.log("5 pegou localizacao")
      setLocation(location);
      setAceitou(true);
      return true;
    } else {
      return false;
    }
  }

  async function PegandoLocalizacao() {
    console.log("1 pegando permissao")
    const permissao = await requestLocationPermission();
    console.log("6 pegou permissao")
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
