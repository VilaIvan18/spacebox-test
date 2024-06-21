import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useTheme } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const CloseButton = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Ionicons
      style={styles.exitButton}
      onPress={goBack}
      name="close"
      color={theme.dark ? "white" : "black"}
      size={42}
    />
  );
};

export default CloseButton;

const styles = StyleSheet.create({
  exitButton: {
    position: "absolute",
    alignSelf: "flex-start",
    top: 50,
    left: 25,
  },
});
