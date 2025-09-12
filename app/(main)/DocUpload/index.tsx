import CustomUpload from "@/components/CustomUpload";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";


const DocumentUploadScreen: React.FC = () => {

  const [visa, setVisa] = useState<string | null>(null);

  const handleSubmit = () => {
    if ( !visa) {
      Alert.alert("Missing Documents", "Please upload all required documents.");
      return;
    }

    // 🔒 Enterprise: Call backend API to upload securely here
    Alert.alert("Success", "All documents uploaded successfully!");
  };

  return (
    <ScrollView style={styles.container}>
      <CustomUpload
        label="Upload VISA"
        onFilePicked={(uri) => setVisa(uri)}
      />

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Documents</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 16,
  },
  submitBtn: {
    backgroundColor: "#6200EE",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 20,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DocumentUploadScreen;
