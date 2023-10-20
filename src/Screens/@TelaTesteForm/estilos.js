import { Dimensions, StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ViewBody: {
    // padding: 25,
    alignItems: "center",
  },
  Texto: {
    color: "#D3D3D3",
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
  Mapa: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  Search: {
    position: "absolute",
    width: '90%',
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
  },
  InputMapa: {
    backgroundColor: "#888",
    borderWidth: 1,
  }
})

export default estilos;