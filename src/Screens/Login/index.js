import React, { useContext, useEffect } from "react";
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

// Validacao de formulario
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { validarUsuario } from "../../servicos/requisicoes/usuario";
import { UsuarioContext } from "../../contexts/loginContext";

import Header from "../../Components/Header";
import estilos from "./estilos";

import Chuva from "../../assets/Login/chuva.png";
import { Alert } from "react-native";

export default function Login() {
  const createUserFormSchema = z.object({
    email: z.string().min(1, "Campo obrigatório."),
    senha: z.string().min(1, "Campo obrigatório."),
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });

  const { Login, usuario } = useContext(UsuarioContext);

  useEffect(() => {
    console.log("lugar usuario sim", usuario);
    if (usuario.login === true) {
      Alert.alert("Bem vindo!", usuario.Nome);
      reset();
      navigation.navigate("home");
    }
  }, [usuario]);

  const onSubmit = async (data) => {
    const response = await Login(data.email, data.senha);
    if (!response) {
      Alert.alert("Email ou senha incorretos");
    }
  };

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("signIn");
  };
  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      {/* <Header /> */}
      <ScrollView>
        <View style={estilos.ViewBody}>
          <View style={estilos.Topo}>
            <Text style={estilos.Titulo}>De volta ao</Text>
            <Text style={estilos.Titulo}>Pé D'Água!</Text>
            <View style={estilos.ViewImagens}>
              <Image source={Chuva} />
            </View>
          </View>
          <View style={estilos.Formulario}>
            <Text style={estilos.TituloCadastro}>Login</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  placeholder="Digite seu E-mail"
                  value={value}
                  onChangeText={onChange}
                  style={[estilos.Input, errors.email && estilos.InputError]}
                />
              )}
            />
            {errors.email && (
              <Text style={estilos.TextoErro}>{errors?.email?.message}</Text>
            )}
            <Controller
              control={control}
              name="senha"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  placeholder="Digite sua Senha"
                  value={value}
                  secureTextEntry={true}
                  onChangeText={onChange}
                  style={[estilos.Input, errors.senha && estilos.InputError]}
                />
              )}
            />
            {errors.senha && (
              <Text style={estilos.TextoErro}>{errors?.senha?.message}</Text>
            )}
            <Button title="Entrar" onPress={handleSubmit(onSubmit)} />
            <View style={estilos.Esqueceu}>
              <Text style={estilos.Texto}>Ainda não possui uma conta?</Text>
              <View style={estilos.EsqueceuCaminho}>
                <Text style={estilos.Texto}>Você pode</Text>
                {/* <TouchableOpacity onPress={handlePress}> */}
                <TouchableOpacity onPress={handlePress}>
                  <Text style={estilos.TextoEsqueceu}>
                    {" "}
                    criar uma conta aqui!
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
