import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Header from "../../Components/Header";

import estilos from "./estilos";

export default function Login() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("home");
  };
  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      <Header />
      <ScrollView>
        <View style={estilos.ViewBody}>
          <Text>Texto</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
