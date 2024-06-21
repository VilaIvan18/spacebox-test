//IMPORTS
import React, { useState } from "react";
import { Alert, FlatList, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "@/components/Loader";
import { useFocusEffect } from "expo-router";
import { listFiles } from "@/utils/getImages";

interface IImage {
  name: string;
}

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<IImage[]>([]);

  //REFRESH IMAGES LIST
  const refreshFilesList = async () => {
    try {
      const filesResponse = await listFiles();
      setFiles(filesResponse);
      setLoading(false);
    } catch (error: any) {
      Alert.alert(error.message);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      refreshFilesList();
    }, [])
  );

  //IMAGE COMPONENT
  const renderImageItem = ({ item }: { item: IImage }) => (
    <Image
      source={{ uri: item.name }}
      style={styles.image}
      resizeMode="stretch"
    />
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={files}
        renderItem={renderImageItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    gap: 50,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
});

export default HomeScreen;
