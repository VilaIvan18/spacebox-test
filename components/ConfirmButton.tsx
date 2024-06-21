import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";

interface IProps {
  onPress?: () => void;
}

const ConfirmButton = ({ onPress }: IProps) => {
  const theme = useTheme();

  return (
    <Ionicons
      style={styles.exitButton}
      onPress={onPress}
      name="checkmark-circle"
      color={theme.dark ? "white" : "black"}
      size={72}
    />
  );
};

export default ConfirmButton;

const styles = StyleSheet.create({
  exitButton: {
    position: "absolute",
    alignSelf: "center",
    bottom: 50,
  },
});
