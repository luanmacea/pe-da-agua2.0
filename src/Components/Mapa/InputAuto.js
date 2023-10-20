import { View, StyleSheet, Text } from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";

export default function InputAutocomplete({
  label,
  placeholder,
  onPlaceSelected,
}) {
  return (
    <>
      {label && <Text style={styles.Texto}>{label}</Text>}
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.InputMapa }}
        placeholder={placeholder}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: "AIzaSyBahdyrhsTC0qww9o94eV4pzEA2uuYJ6wY",
          language: "pt-BR",
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  InputMapa: {
    backgroundColor: "#d3d3d3",
    borderWidth: 1,
    borderColor: "#000",
  },
  Texto: {
    color: "#D3D3D3",
    fontSize: 16,
    // paddingVertical: 3,
  },
});
