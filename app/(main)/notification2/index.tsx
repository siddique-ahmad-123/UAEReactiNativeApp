import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { styles } from "../styles/Notification.Styles";
import CustomButton from "@/components/CustomButton";
import { localStyles } from "../styles/Notification2.Styles";

const Notification2Screen = () => {
  const [description, setDescription] = useState("Need help for Credit Card");
  const [resolution, setResolution] = useState("Pending...");

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Purple Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subHeader}>
          Find all of your notifications here.
        </Text>
      </View>

      {/* White Container with Rounded Top */}
      <View style={styles.container}>
        <Text style={localStyles.title2}>Your Request is under processing</Text>
        <Text style={localStyles.subtitle}>
          We will notify you once we receive any update on your request
        </Text>

        {/* Editable Description Box */}
        <View style={localStyles.textBox}>
          <Text style={localStyles.label}>Description</Text>
          <TextInput
            style={localStyles.editableBox}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* Read-only Resolution */}
        <View style={localStyles.textBox}>
          <Text style={localStyles.label}>Resolution Provided</Text>
          <TextInput
            style={localStyles.editableBox}
            value={resolution}
            editable={false} // 🔒 non-editable
            multiline
          />
        </View>

        {/* Footer Button */}
        <CustomButton
          title="Back"
          size="full"
          variant="primary"
          type="filled"
          onPress={() => console.log("Back pressed")}
          style={{ marginTop: 30 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notification2Screen;
