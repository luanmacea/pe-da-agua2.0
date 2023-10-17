import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

// Validacao de formulario
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Header from "../../Components/Header";

import Mulher from "../../assets/SIgnIn/character-4-standing.png";
import Homem from "../../assets/SIgnIn/character-5-standing.png";

import estilos from "./estilos";

export default function Login() {
  const createUserFormSchema = z.object({
    nome: z
      .string("banana")
      .min(1, "Nome obrigatório")
      .nonempty("Nao pode ser vazio"),
    email: z
      .string()
      .email("informa um e-mail valido")
      .min(1, "E-mail obrigatório"),
    telefone: z.string().min(1, "Favor preencher o campo."),
    senha: z.string().min(1, "Favor preencher o campo."),
    cep1: z.string().min(1, "Favor preencher o campo."),
    cep2: z.string().min(1, "Favor preencher o campo."),
  });

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

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("login");
  };

  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      <Header />
      <ScrollView>
        <View style={estilos.ViewBody}>
          <View style={estilos.Topo}>
            <Text style={estilos.Titulo}>
              Pronto para se juntar ao Pé d’água?
            </Text>
            <View style={estilos.ViewImagens}>
              <Image source={Mulher} style={estilos.ImgMulher} />
              <Image source={Homem} style={estilos.ImgHomem} />
            </View>
          </View>
          <Text style={estilos.TituloCadastro}>Cadastrar</Text>
          <Controller
            control={control}
            name="nome"
            render={({ field: { value, onChange } }) => (
              <TextInput
                placeholder="Digite seu Nome"
                value={value}
                onChangeText={onChange}
                style={[estilos.Input, errors.nome && estilos.InputError]}
              />
            )}
          />
          {errors.nome && (
            <Text style={estilos.TextoErro}>{errors?.nome?.message}</Text>
          )}
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
            name="telefone"
            render={({ field: { value, onChange } }) => (
              <TextInput
                placeholder="Digite seu Telefone"
                value={value}
                onChangeText={onChange}
                style={[estilos.Input, errors.telefone && estilos.InputError]}
              />
            )}
          />
          {errors.telefone && (
            <Text style={estilos.TextoErro}>{errors?.telefone?.message}</Text>
          )}
          <Controller
            control={control}
            name="senha"
            render={({ field: { value, onChange } }) => (
              <TextInput
                placeholder="Digite sua Senha"
                value={value}
                onChangeText={onChange}
                style={[estilos.Input, errors.senha && estilos.InputError]}
              />
            )}
          />
          {errors.senha && (
            <Text style={estilos.TextoErro}>{errors?.senha?.message}</Text>
          )}
          <Controller
            control={control}
            name="cep1"
            render={({ field: { value, onChange } }) => (
              <TextInput
                placeholder="CEP favorito 1"
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
                placeholder="CEP favorito 2"
                value={value}
                onChangeText={onChange}
                style={[estilos.Input, errors.cep2 && estilos.InputError]}
              />
            )}
          />
          {errors.cep2 && (
            <Text style={estilos.TextoErro}>{errors?.cep2?.message}</Text>
          )}
          <Button title="Cadastrar" onPress={handleSubmit(onSubmit)} />
          <View style={estilos.Esqueceu}>
            <Text style={estilos.Texto}>Já possui uma conta?</Text>
            <View style={estilos.EsqueceuCaminho}>
              <Text style={estilos.Texto}>Você pode</Text>
              <TouchableOpacity onPress={handlePress}>
                <Text style={estilos.TextoEsqueceu}> fazer login aqui!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
