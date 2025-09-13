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
} from "react-native";
import { useTheme } from "styled-components/native";
import { styles } from "./utils";
import { spacing } from "@/constants/Metrics";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";
import Entypo from "@expo/vector-icons/Entypo";
interface CustomUploadProps {
  label: string;
  onFilePicked?: (uri: string) => void;
  mode?: "all" | "photo";
}

const CustomUpload = ({
  label,
  mode = "all",
  onFilePicked,
}: CustomUploadProps) => {
  const [visible, setVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileIsPdf, setFileIsPdf] = useState<boolean>(false);

  const theme = useTheme();

  const handlePickFile = async () => {
    setVisible(false);
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
      copyToCacheDirectory: true,
    });
    if (!result.canceled && result.assets[0]?.uri) {
      const uri = result.assets[0].uri;
      setFileUri(uri);
      setFileName(result.assets[0].name ?? uri.split("/").pop() ?? "document");
      setFileIsPdf(uri.toLowerCase().endsWith(".pdf"));
      onFilePicked?.(uri);
    }
  };

  const handleTakePhoto = async () => {
    setVisible(false);
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]?.uri) {
      const uri = result.assets[0].uri;
      setFileUri(uri);
      setFileName("photo.jpg");
      setFileIsPdf(false);
      onFilePicked?.(uri);
    }
  };

  const handlePickImage = async () => {
    setVisible(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]?.uri) {
      const uri = result.assets[0].uri;
      setFileUri(uri);
      setFileName(uri.split("/").pop() ?? "image.jpg");
      setFileIsPdf(false);
      onFilePicked?.(uri);
    }
  };

  const handlePreview = async () => {
    if (!fileUri) return;

    if (fileIsPdf) {
      const supported = await Linking.canOpenURL(fileUri);
      if (supported) {
        await Linking.openURL(fileUri);
      } else {
        Alert.alert("Cannot open this file type");
      }
    } else {
      setPreviewVisible(true);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          { borderColor: theme.colors.inputFieldBorder },
          { backgroundColor: theme.colors.background },
        ]}
        onPress={fileUri ? handlePreview : () => setVisible(true)}
      >
        <View>
          <Text style={[styles.label, { color: theme.colors.primaryColor }]}>
            {label}
          </Text>
          {fileName && (
            <Text
              style={{
                fontSize: 12,
                color: theme.colors.primaryColor ?? theme.colors.subtitle,
                marginTop: 2,
              }}
            >
              {fileName}
            </Text>
          )}
        </View>
        <Feather
          name={fileUri ? "eye" : "upload"}
          size={spacing.lg}
          color={theme.colors.primaryColor}
        />
      </TouchableOpacity>
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
              onPress={handleTakePhoto}
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
                  onPress={handlePickImage}
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
                  onPress={handlePickFile}
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
            source={{ uri: fileUri || "" }}
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
