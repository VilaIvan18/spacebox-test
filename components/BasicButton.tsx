import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface IProps {
  title: string;
  onPress: () => void;
}

const BasicButton = ({ title, onPress }: IProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        { borderColor: theme.dark ? "white" : "black" },
      ]}
      onPress={onPress}
    >
      <Text style={{ color: theme.dark ? "white" : "black" }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BasicButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    padding: 12,
    alignItems: "center",
    borderRadius: 6,
    width: "100%",
  },
});
