import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";
import { styles } from "./utils";
import { spacing } from "@/constants/Metrics";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";

interface CustomUploadProps {
  label: string;
  onFilePicked?: (uri: string) => void;
}

const CustomUpload = ({ label, onFilePicked }: CustomUploadProps) => {
  const [visible, setVisible] = useState(false);

  // 📂 Pick document
  const handlePickFile = async () => {
    setVisible(false);
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      onFilePicked?.(result.assets[0].uri);
    }
  };

  // 📷 Take photo
  const handleTakePhoto = async () => {
    setVisible(false);
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      onFilePicked?.(result.assets[0].uri);
    }
  };

  const theme = useTheme();
  return (
    <>
      {/* Upload Button */}
      <TouchableOpacity
        style={[
          styles.container,
          { borderColor: theme.colors.inputFieldBorder },
          { backgroundColor: theme.colors.background },
        ]}
        onPress={() => setVisible(true)}
      >
        <Text style={[styles.label, { color: theme.colors.primaryColor }]}>
          {label}
        </Text>
        <Feather
          name="upload"
          size={spacing.lg}
          color={theme.colors.primaryColor}
        />
      </TouchableOpacity>

      {/* 📌 Custom Bottom Sheet Modal */}
      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        onBackButtonPress={() => setVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.3}
        style={localStyles.modal}
      >
        <View style={localStyles.sheet}>
          <Text style={localStyles.title}>📄 Document Upload</Text>

          <TouchableOpacity onPress={handlePickFile} style={localStyles.item}>
            <Text
              style={[
                localStyles.itemText,
                { backgroundColor: theme.colors.primaryLightColor },
              ]}
            >
              📂 Upload File
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTakePhoto} style={localStyles.item}>
            <Text
              style={[
                localStyles.itemText,
                { backgroundColor: theme.colors.primaryLightColor },
              ]}
            >
              📷 Take Photo
            </Text>
          </TouchableOpacity>

          <View style={localStyles.divider} />

          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={localStyles.item}
          >
            <Text style={[localStyles.itemText, { color: "red" }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const localStyles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    padding: 35,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#222",
  },
  item: {
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 15,
    color: "#333",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 4,
  },
});

export default CustomUpload;
