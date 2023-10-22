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

// import {
//   cadastrarUsuario,
//   verificarEmailRepetido,
// } from "../../servicos/requisicoes/usuario";
import {
  cadastrarUsuario,
  verificarEmailRepetido,
  pegarUsuarios,
} from "../../servicos/FireBase/usuarios";
import { validarCep } from "../../servicos/requisicoes/validacoes";

import Mulher from "../../assets/SIgnIn/character-4-standing.png";
import Homem from "../../assets/SIgnIn/character-5-standing.png";

import estilos from "./estilos";

export default function Login() {
  // async function ValidacaoCep(cep) {
  //   const response = await validarCep(cep);
  //   if(response === true) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  const createUserFormSchema = z.object({
    nome: z.string("banana").min(1, "Nome obrigatório"),
    email: z
      .string()
      // .email("informa um e-mail valido")
      .min(1, "E-mail obrigatório"),
    telefone: z.string(),
    // .min(10, "informe um telefone correto (coloque DDD).")
    // .max(11, "informe um telefone correto (Nao coloque o +55)."),
    senha: z.string().min(1, "Favor preencher o campo."),
    cep1: z.string().length(8, "Digite um CEP válido."),
    // .ValidacaoCep("Cep inválido."),
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

  function NovoUsuario(data) {
    const newUser = {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      senha: data.senha,
      cep1: data.cep1,
      cep2: data.cep2,

      // CepsFavoritos: (data.cep1 + ';' + data.cep2),
      // Email: data.email,
      // Nome: data.nome,
      // Senha: data.senha,
      // Telefone: data.telefone,
    };

    // console.log(newUser);
    return newUser;
  }

  const onSubmit = async (data) => {
    const novoUsuario = NovoUsuario(data);
    const response = await pegarUsuarios();
    console.log("usuarios: ", response)
    // const responseEmail = await verificarEmailRepetido(novoUsuario.email);
    // console.log(responseEmail)
    // const responseCep1 = await validarCep(novoUsuario.cep1);
    // console.log(responseCep1)
    // const responseCep2 = await validarCep(novoUsuario.cep2);
    // console.log(responseCep2)
    // if (responseEmail === true) {
    //   Alert.alert("Email já cadastrado");
    //   console.log("Email já cadastrado");
    //   return;
    // } else if (responseCep1 === false) {
    //   Alert.alert("Cep1 inválido");
    //   return;
    // } else if (responseCep2 === false) {
    //   Alert.alert("Cep2 inválido");
    //   return;
    // } else {
    //   const response = await cadastrarUsuario(novoUsuario);
    //   console.log(response);
    //   reset();
    //   handlePress();
    // }
  };

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("login");
  };
  useEffect(() => {});

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
