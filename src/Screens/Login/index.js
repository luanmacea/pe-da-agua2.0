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

// Validacao de formulario
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Header from "../../Components/Header";
import estilos from "./estilos";

import Nuvem from "../../assets/Login/nuvem.png";
import Mulher from "../../assets/Login/mulher-sentada.png";
import Chuva from "../../assets/Login/chuva.png";

export default function Login() {
  const createUserFormSchema = z.object({
    nome: z.string("banana").min(1, "Nome obrigatório"),
    email: z
      .string()
      .email("informa um e-mail valido")
      .min(1, "E-mail obrigatório"),
    telefone: z
      .string()
      .min(10, "informe um telefone correto (coloque DDD).")
      .max(11, "informe um telefone correto (Nao coloque o +55)."),
    senha: z.string().min(1, "Favor preencher o campo."),
    cep1: z.string().min(1, "Favor preencher o campo."),
    cep2: z.string().min(1, "Favor preencher o campo."),
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("signIn");
  };
  return (
    <LinearGradient colors={["#143D4C", "#042024"]} style={estilos.Container}>
      <Header />
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
            <TextInput placeholder="Digite seu E-mail" style={estilos.Input} />
            <TextInput placeholder="Digite sua senha" style={estilos.Input} />
            <View style={estilos.Esqueceu}>
              <Text style={estilos.Texto}>Ainda não possui uma conta?</Text>
              <View style={estilos.EsqueceuCaminho}>
                <Text style={estilos.Texto}>Você pode</Text>
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
