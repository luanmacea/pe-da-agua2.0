import { useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Header from "../../Components/Header";
import { UsuarioContext } from "../../contexts/loginContext";

import LogoAgua from "../../assets/BemVindo/logo-agua.png";

import estilos from "./estilos";

export default function Perfil() {
  const navigation = useNavigation();
  const createUserFormSchema = z.object({
    cep1: z.string().length(8, "Digite um CEP válido."),
    cep2: z.string().length(8, "Digite um CEP válido."),
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });

  const handlePress = () => {
    navigation.navigate("home");
  };
  const { usuario } = useContext(UsuarioContext);
  const cepfavorito = usuario.CepsFavoritos;
  const ceps = cepfavorito.split(";");
  const Cep1 = ceps[0];
  const Cep2 = ceps[1];

  const onSubmit = async (data) => {
    const response = await validarCep(data.cep1);
    const response2 = await validarCep(data.cep2);
  };

  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      <Header />
      {/* <ScrollView> */}
      <View style={estilos.ViewBody}>
        <View style={estilos.ViewHeader}>
          <View style={estilos.LogoAguaView}>
            <Image source={LogoAgua} style={estilos.LogoAguaImage} />
          </View>
          <Text style={estilos.Titulo}>Olá, {usuario.Nome}</Text>
          <Text style={estilos.Legenda}>Edite aqui os seus CEPs favoritos</Text>
        </View>
        <View>
          <Controller
            control={control}
            name="cep1"
            render={({ field: { value, onChange } }) => (
              <TextInput
                placeholder={Cep1}
                value={value}
                onChangeText={onChange}
                style={[estilos.Input, errors.cep1 && estilos.InputError]}
              />
            )}
          />
          {errors.cep1 && (
            <Text style={estilos.TextoErro}>{errors?.cep1?.message}</Text>
          )}
          <Controller
            control={control}
            name="cep2"
            render={({ field: { value, onChange } }) => (
              <TextInput
                placeholder={Cep2}
                value={value}
                onChangeText={onChange}
                style={[estilos.Input, errors.cep2 && estilos.InputError]}
              />
            )}
          />
          {errors.cep2 && (
            <Text style={estilos.TextoErro}>{errors?.cep2?.message}</Text>
          )}
        </View>
        <TouchableOpacity
          style={estilos.ViewBotao}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={estilos.TextoBotao}>Salvar</Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </LinearGradient>
  );
}
