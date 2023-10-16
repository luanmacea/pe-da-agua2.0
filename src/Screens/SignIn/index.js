import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Header from "../../Components/Header";

import Mulher from "../../assets/SIgnIn/character-4-standing.png";
import Homem from "../../assets/SIgnIn/character-5-standing.png";

import estilos from "./estilos";

export default function Login() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [cep1, setCep1] = useState("");
  const [cep2, setCep2] = useState("");

  const navigation = useNavigation();

  const emailRegExp = /\S+@\S+\.\S{2,}/;

function validarFormulario() {
  // Verificando se os campos estão preenchidos e corretos
  if (
    nome === "" ||
    email === "" ||
    telefone === "" ||
    senha === "" ||
    cep1 === ""||
    cep2 === ""
  ) {
    Alert.alert(
      "Por favor, preencha todos os campos (nome, email, telefone, senha e ceps)."
    );
    return false;
  } else if (!emailRegExp.test(email)) {
    Alert.alert("Por favor, informe um e-mail válido.");
    return false;
  } else if (
    nome.length < 2 ||
    nome.length > 20 ||
    email.length < 5
  ) {
    Alert.alert(
      "Os campos nome e email não atingiram o número mínimo de caracteres."
    );
    return false;
  } else if (telefone.length < 10) {
    Alert.alert(
      "Voce digitou seu telefone incorretamente, tente novamente."
    );
    return false;
  } else if (senha.length < 6 || senha.length > 8) {
    Alert.alert(
      "A senha deve ter no mínimo 6 dígitos e no máximo 8 dígitos."
    );
    return false;
  } else {
    console.log('foi')
    return true;
  }
}

  const formatarTelefone = (telefone) => {
    let telefoneAtual = telefone.replace(/\D/g, "");
    if (telefoneAtual.length > 11) {
      telefoneAtual = telefoneAtual.slice(0, 11);
    }
    if (telefoneAtual.length >= 7 && telefoneAtual.length <= 11) {
      telefoneAtual = telefoneAtual.replace(
        /^(\d{2})(\d{4,5})(\d{4})$/,
        "($1) $2-$3"
      );
    }
    setTelefone(telefoneAtual);
  };

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
          <Text style={estilos.TituloCadastro}>Cadastro</Text>
          <TextInput
            placeholder="Digite seu nome"
            style={estilos.Input}
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            placeholder="Digite seu E-mail"
            style={estilos.Input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Digite seu telefone"
            style={estilos.Input}
            value={telefone}
            onChangeText={formatarTelefone}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Digite sua senha"
            style={estilos.Input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          <TextInput
            placeholder="CEP favorito 1"
            style={estilos.Input}
            value={cep1}
            onChangeText={setCep1}
          />
          <TextInput
            placeholder="CEP favorito 2"
            style={estilos.Input}
            value={cep2}
            onChangeText={setCep2}
          />
          <Button title="Cadastrar" onPress={validarFormulario} />
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
