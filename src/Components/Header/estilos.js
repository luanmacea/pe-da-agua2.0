import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  Container: {
    backgroundColor: "#143D4C",
  },
  ViewHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
		padding: 15,
  },
  Menu: {
    position: "absolute",
		left: 20,
		width: '10%',
		height: '100%',
  },
  Titulo: {
    fontSize: 30,
    color: "#FFF",
    fontFamily: "Megrim-Regular",
  },
  Perfil: {
    position: "absolute",
    right: 20,
    width: '10%',
    height: '100%'
  }
})

export default estilos