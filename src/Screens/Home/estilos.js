import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  Container: {
    flex: 1
  },
  ViewBody: {
    padding: 25,
  },
  Texto: {
    color: "#D3D3D3",
    fontSize: 16,
    paddingVertical: 3
  },
  Mapa: {
    width: "100%",
    height: 230,
    marginTop: "20%",
    marginBottom: 20,
  },
  Search: {
    position: "absolute",
    width: '100%',
    shadowColor: "#000",
    zIndex: 9999,
  },
  Informacoes: {
    backgroundColor: "#034C5C",
    flexDirection: "row",
  }
});

export default estilos;
