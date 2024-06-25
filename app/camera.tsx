//IMPORTS
import CloseButton from "@/components/CloseButton";
import ConfirmButton from "@/components/ConfirmButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import Loader from "@/components/Loader";
import { uploadImage } from "@/firebase-config";

const CameraScreen = () => {
  const camera = useRef<Camera>(null);
  const navigation = useNavigation();

  const [isCameraFront, setIsCameraFront] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<PhotoFile | null>(null);
  const [loading, setLoading] = useState(false);

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice(isCameraFront ? "front" : "back");

  // TAKE PHOTO
  const onTakeImage = async () => {
    const photo = await camera.current?.takePhoto();
    if (photo) {
      setCapturedPhoto(photo);
    }
  };

  //APROVE PHOTO AND LOAD TO FB
  const onAproveImage = async () => {
    try {
      if (capturedPhoto) {
        const fileName = capturedPhoto?.path.split("/").pop();
        setLoading(true);
        await uploadImage(capturedPhoto?.path, fileName).then(() => {
          setLoading(false), navigation.goBack();
        });
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  //REQUEST PERMISSION FOR CAMERA
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  //IF CAMERA NOT FOUND
  if (!device) {
    return (
      <View style={styles.container}>
        <Text>Camera device not found</Text>
        <CloseButton />
      </View>
    );
  }

  if (loading) {
    return <Loader />;
  }

  //PHOTO PREVIEW
  if (capturedPhoto) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: capturedPhoto.path }}
          style={StyleSheet.absoluteFill}
        />
        <CloseButton />
        <ConfirmButton onPress={onAproveImage} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        ref={camera}
        photo={true}
      />
      <Pressable onPress={onTakeImage} style={styles.makePhotoButton} />
      <Ionicons
        style={styles.changeCameraSideButton}
        onPress={() => setIsCameraFront((prev) => !prev)}
        name="camera-reverse"
        color="white"
        size={42}
      />
      <CloseButton />
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  makePhotoButton: {
    position: "absolute",
    alignSelf: "center",
    bottom: 50,
    width: 75,
    height: 75,
    backgroundColor: "white",
    borderRadius: 75,
  },

  changeCameraSideButton: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 50,
    right: 25,
  },
});
