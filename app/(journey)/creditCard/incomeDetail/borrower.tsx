import FormLayout from "@/components/Form/FormLayout";
import { incomeDetailSchema } from "@/schemas/creditCard/incomeDetailSchema";
import { useApplicationStore } from "@/store/applicationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FormInput from "./FormInput";

export default function BorrowerIncomeScreen({ navigation }: any) {
  const { t } = useTranslation();
  const { updateField, nextStep, prevStep, formData } = useApplicationStore();
  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(incomeDetailSchema),
    defaultValues: {
      incomeType: formData.incomeType || "Salaried",
    },
    shouldUnregister: true,
  });
  const incomeType = watch("incomeType");
  const empDetailFetchMethod = watch("empDetailFetchMethod");
  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    nextStep();
  };
  return (
    <FormLayout
      stepNumber={2}
      title={t("incomeDetails")}
      subTitle={t("borrowerDetails")}
      noOfBars={2}
      activeBarIndex={0}
      onBack={() => prevStep}
      onClose={() => navigation.navigate("Home")}
      onInfoPress={() => alert("Info about this step")}
      onSaveAndNext={handleSubmit(onSubmit)}
    >
      <Text style={styles.sectionTitle}>Select Income Type</Text>
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            incomeType === "Salaried" && styles.toggleActive,
          ]}
          onPress={() => setValue("incomeType", "Salaried")}
        >
          <Text
            style={[
              styles.toggleText,
              incomeType === "Salaried" && styles.toggleTextActive,
            ]}
          >
            Salaried
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            incomeType === "Self Employed" && styles.toggleActive,
          ]}
          onPress={() => setValue("incomeType", "Self Employed")}
        >
          <Text
            style={[
              styles.toggleText,
              incomeType === "Self Employed" && styles.toggleTextActive,
            ]}
          >
            Self Employed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Employment Info */}
      <Text style={styles.sectionTitle}>Employment Information</Text>
      <Text style={styles.subTitle}>
        Select Method to Fetch Employment Details
      </Text>

      <View style={styles.cardRow}>
        <TouchableOpacity
          style={[
            styles.methodCard,
            empDetailFetchMethod === "AECB" && styles.methodCardActive,
          ]}
          onPress={() => setValue("empDetailFetchMethod", "AECB")}
        >
          <Text style={styles.cardTitle}>AECB</Text>
          <Text style={styles.cardDesc}>
            Details will be pulled from Credit Bureau
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.methodCard,
            empDetailFetchMethod === "Salary Certificate" &&
              styles.methodCardActive,
          ]}
          onPress={() => setValue("empDetailFetchMethod", "Salary Certificate")}
        >
          <Text style={styles.cardTitle}>Salary Certificate</Text>
          <Text style={styles.cardDesc}>
            Salary Certificate not older than 1 month to be uploaded
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.fetchButton}>
        <Text style={styles.fetchButtonText}>Fetch Employment Details</Text>
      </TouchableOpacity>

      {incomeType === "Salaried" ? (
        <>
          <FormInput
            control={control}
            name="employerName"
            placeholder="Employer Name"
          />
          <FormInput
            control={control}
            name="employedFrom"
            placeholder="Employed From"
          />
          <FormInput
            control={control}
            name="currentExp"
            placeholder="Current Experience (Months)"
            keyboardType="numeric"
          />
          <FormInput
            control={control}
            name="totalExp"
            placeholder="Total Experience (Months)"
            keyboardType="numeric"
          />
          <FormInput control={control} name="emirate" placeholder="Emirates" />
        </>
      ) : (
        <>
          <FormInput
            control={control}
            name="nameOfBusiness"
            placeholder="Name of Business"
          />
          <FormInput
            control={control}
            name="legalForm"
            placeholder="Legal Form"
          />
          <FormInput
            control={control}
            name="emiratesBusiness"
            placeholder="Emirates"
          />
          <FormInput
            control={control}
            name="dateOfEstabilishment"
            placeholder="Date of Establishment (YYYY-MM-DD)"
          />
          <FormInput
            control={control}
            name="vintage"
            placeholder="Vintage"
            keyboardType="numeric"
          />
          <FormInput
            control={control}
            name="licenseNo"
            placeholder="License No"
          />
          <FormInput
            control={control}
            name="natureOfBusiness"
            placeholder="Nature of Business"
          />
        </>
      )}
    </FormLayout>
  );
}

// ---------- Styles ----------
const PURPLE = "#4B006E";
const YELLOW = "#FFD700";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PURPLE },
  header: {
    backgroundColor: PURPLE,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  scrollView: {
    padding: 16,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    backgroundColor: "#fff",
  },
  step: { color: YELLOW, fontWeight: "bold", fontSize: 18, marginRight: 8 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  sectionTitle: { marginTop: 16, fontWeight: "bold", fontSize: 16 },
  subTitle: { fontSize: 14, color: "#555", marginVertical: 8 },
  toggleRow: { flexDirection: "row", marginVertical: 8 },
  toggleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: PURPLE,
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
    marginHorizontal: 4,
  },
  toggleActive: { backgroundColor: PURPLE },
  toggleText: { color: PURPLE, fontWeight: "500" },
  toggleTextActive: { color: "#fff" },
  cardRow: { flexDirection: "row", marginVertical: 8 },
  methodCard: {
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fafafa",
  },
  methodCardActive: {
    borderColor: PURPLE,
    borderWidth: 2,
    backgroundColor: "#f2e6f9",
  },
  cardTitle: { fontWeight: "bold", fontSize: 14, marginBottom: 4 },
  cardDesc: { fontSize: 12, color: "#555" },
  fetchButton: {
    backgroundColor: YELLOW,
    paddingVertical: 12,
    borderRadius: 6,
    marginVertical: 8,
    alignItems: "center",
  },
  fetchButtonText: { color: "#000", fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 6,
    marginVertical: 6,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  backButton: {
    borderWidth: 1,
    borderColor: PURPLE,
    marginRight: 8,
  },
  nextButton: {
    backgroundColor: YELLOW,
    marginLeft: 8,
  },
  backButtonText: { color: PURPLE, fontWeight: "600" },
  nextButtonText: { color: "#000", fontWeight: "600" },
});
