import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal as RNModal,
  Image,
  Alert,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "styled-components/native";
import { styles } from "./utils";
import { spacing } from "@/constants/Metrics";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";
import { Controller } from "react-hook-form";
import { useFileUploadMutation } from "@/redux/api/creditCardAPI";
import Toast from "react-native-toast-message";
interface CustomUploadProps {
  label: string;
  control: any;
  name: string;
  mode?: "all" | "photo";
}


const CustomUpload = ({
  label,
  mode = "all",
  control,
  name,
}: CustomUploadProps) => {
  const [visible, setVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [fileUpload] = useFileUploadMutation();
  const theme = useTheme();
  const handlePickFile = async (onChange: any) => {
    setVisible(false);
    
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
      copyToCacheDirectory: true,
    });
    if (!result.canceled && result.assets[0]?.uri) {
      setLoading(true);
      const uri = result.assets[0].uri;
      const name = result.assets[0].name;
      const type = result.assets[0].mimeType;
      const formData = new FormData();
      formData.append("file", {
        uri: uri,
        name: name,
        type: type || "application/octet-stream",
      } as any);
      formData.append("folderName", "12345");
      formData.append("fileName", label);
      const response = await fileUpload(formData).unwrap();
      if (response.status == 200) {
        Toast.show({
          type: "success",
          text1: "File uploaded successfully",
          visibilityTime: 2000,
        });
        onChange({ uri, name, type });
      } else {
        Toast.show({
          type: "error",
          text1: "Server Error!!",
          visibilityTime: 2000,
        });
      }
      setLoading(false);
    }
  };

  const handleTakePhoto = async (onChange: any) => {
    setVisible(false);
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]?.uri) {
      setLoading(true);
      const uri = result.assets[0].uri;
      const name = result.assets[0].fileName;
      const type = result.assets[0].mimeType;
      const formData = new FormData();
      formData.append("file", {
        uri: uri,
        name: name,
        type: type || "application/octet-stream",
      } as any);
      formData.append("folderName", "12345");
      formData.append("fileName", label);
      const response = await fileUpload(formData).unwrap();
      if (response.status == 200) {
        Toast.show({
          type: "success",
          text1: "File uploaded successfully",
          visibilityTime: 2000,
        });
        onChange({ uri, name, type });
      } else {
        Toast.show({
          type: "error",
          text1: "Server Error!!",
          visibilityTime: 2000,
        });
      }
      setLoading(false);
    }
  };
  const handlePickImage = async (onChange: any) => {
    setVisible(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]?.uri) {
      setLoading(true);
      const uri = result.assets[0].uri;
      const name = result.assets[0].fileName;
      const type = result.assets[0].mimeType;
      const formData = new FormData();
      formData.append("file", {
        uri: uri,
        name: name,
        type: type || "application/octet-stream",
      } as any);
      formData.append("folderName", "12345");
      formData.append("fileName", label);
      const response = await fileUpload(formData).unwrap();
      if (response.status == 200) {
        Toast.show({
          type: "success",
          text1: "File uploaded successfully",
          visibilityTime: 2000,
        });
        onChange({ uri, name, type });
      } else {
        Toast.show({
          type: "error",
          text1: "Server Error!!",
          visibilityTime: 2000,
        });
      }
      setLoading(false);
    }
  };

  const handlePreview = async (uri: string, type: string) => {
    if (!uri) return;
    if (type === "application/pdf") {
      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        Alert.alert("Cannot open this file type");
      }
    } else {
      setPreviewVisible(true);
    }
  };

  return (
    <Controller
      control={control}
      name={name ? name : ""}
      render={({ field: { value, onChange } }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: theme.colors.inputFieldBorder },
              { backgroundColor: theme.colors.background },
            ]}
          >
            <View>
              <Text
                style={[styles.label, { color: theme.colors.primaryColor }]}
              >
                {label}
              </Text>
              {value?.name && (
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.colors.primaryColor ?? theme.colors.subtitle,
                    marginTop: 2,
                  }}
                >
                  {value?.name}
                </Text>
              )}
            </View>
            {isloading ? (
              <ActivityIndicator color={theme.colors.primaryColor} />
            ) : (
              <View
                style={{
                  flexDirection: theme.flexRow.flexDirection,
                  gap: spacing.lg, 
                }}
              >
                {value?.uri ? (
                  <>
                    <TouchableOpacity
                      onPress={() => handlePreview(value?.uri, value?.type)}
                    >
                      <Feather
                        name={"eye"}
                        size={spacing.md}
                        color={theme.colors.primaryColor}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onChange()}>
                      <Feather
                        name={"trash-2"}
                        size={spacing.md}
                        color={theme.colors.errorTextColor}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity onPress={() => setVisible(true)}>
                    <Feather
                      name={"upload"}
                      size={spacing.lg}
                      color={theme.colors.primaryColor}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
          <Modal
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}
            onBackButtonPress={() => setVisible(false)}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropOpacity={0.4}
            animationOutTiming={1000}
            style={localStyles.modal}
          >
            <View style={localStyles.sheet}>
              <View style={localStyles.row}>
                <TouchableOpacity
                  style={[
                    localStyles.box,
                    { backgroundColor: theme.colors.primaryLightColor },
                  ]}
                  onPress={() => handleTakePhoto(onChange)}
                >
                  <Feather
                    name="camera"
                    size={22}
                    color={theme.colors.primaryColor}
                  />
                  <Text
                    style={[
                      localStyles.boxText,
                      { color: theme.colors.primaryColor },
                    ]}
                  >
                    Camera
                  </Text>
                </TouchableOpacity>

                {mode === "all" && (
                  <>
                    <TouchableOpacity
                      style={[
                        localStyles.box,
                        { backgroundColor: theme.colors.primaryLightColor },
                      ]}
                      onPress={() => handlePickImage(onChange)}
                    >
                      <Feather
                        name="image"
                        size={22}
                        color={theme.colors.primaryColor}
                      />
                      <Text
                        style={[
                          localStyles.boxText,
                          { color: theme.colors.primaryColor },
                        ]}
                      >
                        Photos
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        localStyles.box,
                        { backgroundColor: theme.colors.primaryLightColor },
                      ]}
                      onPress={() => handlePickFile(onChange)}
                    >
                      <Feather
                        name="paperclip"
                        size={22}
                        color={theme.colors.primaryColor}
                      />
                      <Text
                        style={[
                          localStyles.boxText,
                          { color: theme.colors.primaryColor },
                        ]}
                      >
                        Files
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>

              <View style={localStyles.divider} />

              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={localStyles.cancelBtn}
              >
                <Text style={{ color: "red", fontSize: 16, fontWeight: "600" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <RNModal
            visible={previewVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setPreviewVisible(false)}
          >
            <View style={localStyles.previewWrapper}>
              <Image
                source={{ uri: value?.uri || "" }}
                style={localStyles.previewImage}
                resizeMode="contain"
              />
              <TouchableOpacity
                onPress={() => setPreviewVisible(false)}
                style={localStyles.closeBtn}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </RNModal>
        </>
      )}
    />
  );
};

const localStyles = StyleSheet.create({
  previewWrapper: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "90%",
    height: "70%",
  },
  closeBtn: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  box: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: 90,
  },
  boxText: {
    fontSize: 13,
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  cancelBtn: {
    alignItems: "center",
    paddingVertical: 12,
  },
});

export default CustomUpload;
