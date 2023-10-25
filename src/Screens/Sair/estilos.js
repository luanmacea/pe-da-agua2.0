import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ViewBody: {
    padding: 25,
  },
  Texto: {
    color: "#000000",
    fontSize: 16,
    paddingVertical: 3
  },
  TextoNao: {
    color: "#FFFFFF",
    fontSize: 16,
    paddingVertical: 3
  },
  Input: {
    backgroundColor: "#EBEBEC",
    fontSize: 16,
    height: 60,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  Titulo: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "500",
    marginVertical: 15,
    textAlign: "center",
  },
  ViewBotoes: {
    padding : 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  BotaoSim: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 30,
    marginHorizontal: 10,
  },
  BotaoNao: {
    backgroundColor: "#000000",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 30,
    marginHorizontal: 10,
  }
})

export default estilos;