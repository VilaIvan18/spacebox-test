import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Loader = () => {
  const theme = useTheme();
  return (
    <View style={styles.screenContainer}>
      <Text style={{ color: theme.dark ? "white" : "black" }}>Loading...</Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  screenContainer: {
    width: "100%",
    height: "100%",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
});
