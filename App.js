import { StatusBar, SafeAreaView, ScrollView } from "react-native";
import Home from "./src/Screens/Home";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";

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
      <Home />
    </SafeAreaView>
  );
}
