import "react-native-gesture-handler";

import { StatusBar, SafeAreaView, ScrollView } from "react-native";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import Rotas from "./src/routes/Rotas";

import Header from "./src/Components/Header";

import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Megrim-Regular": require("./src/assets/fonts/Megrim/Megrim-Regular.ttf"),
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; // Mostra algum componente de carregamento ou mensagem enquanto as fontes estão carregando
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Rotas />
    </SafeAreaView>
  );
}
