import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Header from "../../Components/Header";
import Mapa from "../../Components/Mapa/mapa";

import estilos from "./estilos";
import { useEffect } from "react";

export default function Login() {
  const createUserFormSchema = z.object({
    nome: z.string().min(1, "Nome obrigatório"),
    email: z.string().email('informa um e-mail valido').min(1, "E-mail obrigatório"),
  });
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handlePress = () => {
    navigation.navigate("home");
  };
  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      <Header />
      <ScrollView>
        <View style={estilos.ViewBody}>
          <Mapa />
          {/* <Text style={estilos.Titulo}>Crie sua conta</Text>
          <Controller
            control={control}
            name="nome"
            render={({ field: { value, onChange } }) => (
              <TextInput
                placeholder="Nome"
                value={value}
                onChangeText={onChange}
                style={estilos.Input}
              />
            )}
          />
          <Text style={estilos.Texto}>{errors?.nome?.message}</Text>

          <Controller
            control={control}
            name="email"
            rules={{
              required: "E-mail é obrigatório",
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                placeholder="E-mail"
                style={estilos.Input}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Text style={estilos.Texto}>{errors?.email?.message}</Text>

          <Button title="Enviar" onPress={handleSubmit(onSubmit)} /> */}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
