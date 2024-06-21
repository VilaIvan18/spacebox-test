//IMPORTS
import { Alert, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import BasicButton from "@/components/BasicButton";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Loader from "@/components/Loader";
import { uploadImage } from "@/utils/uploadImage";

export default function PhotoUploadScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [loading, setLoading] = useState(false);

  //REQUEST MEDIA LIBRARY PERMISSIONS
  const requestPermission = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access the media library is denied!");
      }
    } catch (error) {
      Alert.alert(
        "An error occurred when requesting permission to access the media library."
      );
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  //PICK IMAGE FROM GALLERY
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      setLoading(true);

      if (!result.canceled) {
        const { uri } = result.assets[0];
        const fileName = uri.split("/").pop();
        await uploadImage(uri, fileName).then(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  //NAVIGATE USER TO OTHER SCREEN
  const goToScreen = (screenName: string) => {
    navigation.navigate(`${screenName}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.screenContainer}>
      <BasicButton title="Take photo" onPress={() => goToScreen("camera")} />
      <BasicButton title="Choose gallery" onPress={pickImage} />
    </View>
  );
}

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
