// import CustomUpload from "@/components/CustomUpload";
// import React, { useState } from "react";
// import {
//   ScrollView,
//   StyleSheet,
//   Alert,
//   TouchableOpacity,
//   Text,
// } from "react-native";


// const DocumentUploadScreen: React.FC = () => {

//   const [visa, setVisa] = useState<string | null>(null);

//   const handleSubmit = () => {
//     if ( !visa) {
//       Alert.alert("Missing Documents", "Please upload all required documents.");
//       return;
//     }

//     // 🔒 Enterprise: Call backend API to upload securely here
//     Alert.alert("Success", "All documents uploaded successfully!");
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <CustomUpload
//         label="Upload VISA"
//         onFilePicked={(uri) => setVisa(uri)}
//       />

//       <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
//         <Text style={styles.submitText}>Submit Documents</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F9F9F9",
//     padding: 16,
//   },
//   submitBtn: {
//     backgroundColor: "#6200EE",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   submitText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default DocumentUploadScreen;

// // import CustomProfileBanner from "@/components/CustomProfileBanner";
// // import React from "react";
// // import { View } from "react-native";


// // export default function HomeScreen() {
// //   return (
// //     <View style={{ padding: 20 }}>
// //       <CustomProfileBanner
// //         name="Mohammad Sahil Munaf"
// //         photoUrl="https://your-image-url.com/profile.jpg"
// //       />
// //     </View>
// //   );
// // }


import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  // Save data
  const saveToken = async () => {
    try {
      await AsyncStorage.setItem("user_token", "uyuyuyuu");
      alert("Token saved!");
    } catch (e) {
      console.error("Saving error:", e);
    }
  };

  // Load data
  const loadToken = async () => {
    try {
      const value = await AsyncStorage.getItem("user_token");
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      console.error("Loading error:", e);
    }
  };

  // Run once when app starts
  useEffect(() => {
    loadToken();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Stored Token: {token ?? "No token saved"}</Text>
      <Button title="Save Token" onPress={saveToken} />
      <Button title="Load Token" onPress={loadToken} />
    </View>
  );
}
