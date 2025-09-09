import FormLayout from "@/components/Form/FormLayout";
import { incomeDetailSchema } from "@/schemas/creditCard/incomeDetailSchema";
import { useApplicationStore } from "@/store/applicationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import SegmentedControl from "@/components/SegmentControl";
import SectionHeader from "@/components/SectionHeader";
import MethodSelector from "@/components/MethodSelector";
import CustomButton from "@/components/CustomButton";
import { spacingVertical } from "@/constants/Metrics";
import CustomInput from "@/components/CustomInput";
import CustomDropDown from "@/components/CustomDropDown";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomUpload from "@/components/CustomUpload";

export default function CoBorrowerIncomeScreen({ navigation }: any) {
  const { t } = useTranslation();
  const { updateField, nextStep, prevStep, formData } = useApplicationStore();
  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(incomeDetailSchema),
    defaultValues: {
      incomeType: formData.incomeType || "Salaried",
      empDetailFetchMethod: formData.empDetailFetchMethod || "AECB",
      incomeDetailFetchMethod: formData.incomeDetailFetchMethod || "Salary Transfer",
      businessDetailFetchMethod: formData.businessDetailFetchMethod || "Upload Trade License",
    },
    //shouldUnregister: true,
  });
  const incomeType = watch("incomeType") ?? "Salaried";
  const empDetailFetchMethod = watch("empDetailFetchMethod") ?? "AECB";
  const businessDetailFetchMethod = watch("businessDetailFetchMethod") ?? "Upload Trade License";
  const incomeDetailFetchMethod = watch("incomeDetailFetchMethod") ?? "Salary Transfer";
  

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    nextStep();
  };
  const employmentMethods = [
    {
      id: "AECB",
      title: "AECB",
      description: "Details will be pulled from Credit Bureau",
      iconName: "card", // Ionicons name
    },
    {
      id: "Salary Certificate",
      title: "Salary Certificate",
      description: "Salary Certificate not older than 1 month to be uploaded",
      iconName: "document-text",
    },
  ];
  const businessMethods = [
    {
      id: "Upload Trade License",
      title: "Upload Trade License",
      description: "Details will be pulled via OCR over Trade License",
      iconName: "business", // Ionicons name
    },
    {
      id: "Manually Enter",
      title: "Manually Enter",
      description: "Manually Entering the Business Details",
      iconName: "create",
    },
  ];
  const salaryIncomeMethods = [
    {
      id: "Salary Transfer",
      title: "Salary Transfer",
      description: "Details will be pulled from Bank & AECB",
      iconName: "swap-horizontal",
    },
    {
      id: "UAE-FTS",
      title: "UAE-FTS",
      description: "Details will be pulled via UAE-FTS & AECB",
      iconName: "swap-vertical",
    },
  ];
  const businessIncomeMethods = [
    {
      id: "Fetch From Bank",
      title: "Fetch From Bank",
      description: "",
      iconName: "swap-horizontal", 
    },
    {
      id: "Upload Bank Statement",
      title: "Upload Bank Statement",
      description: "",
      iconName: "document-text", 
    },
    {
      id: "UAE-FTS",
      title: "UAE-FTS",
      description: "",
      iconName: "swap-vertical",
    },
  ];
  const emiratesOptions = [
    { label: "Dubai", value: "Dubai" },
    { label: "Abu Dhabi", value: "Abu Dhabi" },
    { label: "Sharjah", value: "Sharjah" },
    { label: "Ajman", value: "Ajman" },
    { label: "Umm Al-Quwain", value: "Umm Al-Quwain" },
    { label: "Fujairah", value: "Fujairah" },
    { label: "Ras Al Khaimah", value: "Ras Al Khaimah" },
  ];
  const statusOptions = [
    { label: "Initiated", value: "Initiated" },
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
  ];
  const legalFormOptions = [
    { label: "Sole Proprietorship", value: "Sole Proprietorship" },
    { label: "Limited Liability Company (LLC)", value: "Limited Liability Company (LLC)" },
  ];
  const natureOfBusinessOptions = [
    { label: "IT Services", value: "IT Services" },
    { label: "Trading", value: "Trading" },
    { label: "Retail", value: "Retail" },
  ];
  return (
    <FormLayout
      stepNumber={2}
      title={t("incomeDetails")}
      subTitle={"Co-Borrower"}
      noOfBars={2}
      activeBarIndex={1}
      onBack={() => prevStep}
      onClose={() => navigation.navigate("Home")}
      onInfoPress={() => alert("Info about this step")}
      onSaveAndNext={handleSubmit(onSubmit)}
    >
      <SegmentedControl
        label={"Select Income Type"}
        options={["Salaried", "Self Employed"]}
        defaultValue={incomeType}
        onChange={(value) => setValue("incomeType", value)}
      />
      {incomeType === "Salaried" ? (
        <>
          <SectionHeader
            sectionName="Employment  Information"
            style={{ marginTop: spacingVertical.md }}
          />
          <MethodSelector
            title={"Select Method to Fetch Employment Details"}
            options={employmentMethods}
            selectedId={empDetailFetchMethod}
            onSelect={(id) => setValue("empDetailFetchMethod", id)}
          />
          {empDetailFetchMethod === "Salary Certificate" && (
            <CustomUpload label="Upload Salary Certificate" />
          )}
          <CustomButton
            title="Fetch Employment Details"
            onPress={() => alert("Fetching Employment Details...")}
          />

          <CustomInput
            control={control}
            name="employerName"
            label="Employer Name"
            type="text"
            placeholder="Newgen Software"
          />
          <CustomDatePicker
            control={control}
            name="employedFrom"
            label="Employed From"
          />
          <CustomInput
            control={control}
            name="currentExp"
            label="Current Experience (Months)"
            placeholder="20"
            type="number"
          />
          <CustomInput
            control={control}
            name="totalExp"
            label="Total Experience (Months)"
            placeholder="36"
            type="number"
          />
          <CustomDropDown
            control={control}
            name="emirate"
            label="Emirates"
            data={emiratesOptions}
          />
          <SectionHeader
            sectionName="Income  Details"
            style={{ marginTop: spacingVertical.md }}
          />
          <MethodSelector
            title={"Select Method to Fetch Income Details"}
            options={salaryIncomeMethods}
            selectedId={incomeDetailFetchMethod}
            onSelect={(id) => setValue("incomeDetailFetchMethod", id)}
          />
          {incomeDetailFetchMethod === "UAE-FTS" && (
            <>
              <CustomButton
                title="Fetch Details"
                onPress={() => alert("Fetching Details...")}
              />
              <CustomInput
                control={control}
                name="emirateId"
                label="Emirates ID"
                placeholder="784838291032030"
                type="text"
              />
              <CustomInput
                control={control}
                name="ibanNo"
                label="IBAN No"
                type="text"
                placeholder="AE60030000010090435412"
              />

              <CustomInput
                control={control}
                name="bankingCode"
                label="Banking Code"
                placeholder="30"
                type="text"
              />
              <CustomDatePicker
                control={control}
                name="startDateFts"
                label="Start Date"
              />
              <CustomDatePicker
                control={control}
                name="endDateFts"
                label="End Date"
              />
              <CustomButton
                title="Send Request"
                onPress={() => alert("Fetching Details...")}
              />
              <CustomButton
                title="Get Status"
                onPress={() => alert("Fetching Details...")}
              />
              <CustomDropDown
                control={control}
                name="ftsStatus"
                label="FTS Status"
                data={statusOptions}
              />
            </>
          )}
          <CustomButton
            title="Fetch Salary Details"
            onPress={() => alert("Fetching Details...")}
          />
          <CustomInput
            control={control}
            name="monthlySalaryBankTransfer"
            label="Monthly Salary (Bank Transfer)"
            placeholder="2000"
            type="number"
          />
          <CustomInput
            control={control}
            name="monthlySalaryAECB"
            label="Monthly Salary (AECB)"
            placeholder="2000"
            type="number"
          />
        </>
      ) : (
        <>
          <SectionHeader
            sectionName="Business  Information"
            style={{ marginTop: spacingVertical.md }}
          />
          <MethodSelector
            title={"Select Method to Fetch Business Details"}
            options={businessMethods}
            selectedId={businessDetailFetchMethod}
            onSelect={(id) => setValue("businessDetailFetchMethod", id)}
          />
          {businessDetailFetchMethod === "Upload Trade License" && (
            <CustomUpload label="Upload Trade License" />
          )}
          <CustomButton
            title="Fetch Business Details"
            onPress={() => alert("Fetching Business Details...")}
          />

          <CustomInput
            control={control}
            name="nameOfBusiness"
            label="Name of Business"
            type="text"
            placeholder="Newgen"
          />
          <CustomDropDown
            control={control}
            name="legalForm"
            label="Legal Form"
            data={legalFormOptions}
          />
          <CustomDropDown
            control={control}
            name="emiratesBusiness"
            label="Emirates"
            data={emiratesOptions}
          />
          <CustomDatePicker
            control={control}
            name="dateOfEstabilishment"
            label="Date of Establishment"
          />
          <CustomInput
            control={control}
            name="vintage"
            label="Vintage (Months)"
            placeholder="58"
            type="number"
          />
          <CustomInput
            control={control}
            name="licenseNo"
            label="License No"
            type="text"
            placeholder="DLT34554"
          />
          <CustomDropDown
            control={control}
            name="natureOfBusiness"
            label="Nature of Business"
            data={natureOfBusinessOptions}
          />
          <SectionHeader
            sectionName="Income  Details"
            style={{ marginTop: spacingVertical.md }}
          />
          <MethodSelector
            title={"Select Method to Fetch Income Details"}
            options={businessIncomeMethods}
            selectedId={incomeDetailFetchMethod}
            onSelect={(id) => setValue("incomeDetailFetchMethod", id)}
          />
          {incomeDetailFetchMethod === "Upload Bank Statement" && (
            <CustomUpload label="Upload Bank Statement" />
          )}
          {incomeDetailFetchMethod === "UAE-FTS" && (
            <>
              <CustomButton
                title="Fetch Details"
                onPress={() => alert("Fetching Details...")}
              />
              <CustomInput
                control={control}
                name="emirateId"
                label="Emirates ID"
                placeholder="784838291032030"
                type="text"
              />
              <CustomInput
                control={control}
                name="ibanNo"
                label="IBAN No"
                type="text"
                placeholder="AE60030000010090435412"
              />

              <CustomInput
                control={control}
                name="bankingCode"
                label="Banking Code"
                placeholder="30"
                type="text"
              />
              <CustomDatePicker
                control={control}
                name="startDateFts"
                label="Start Date"
              />
              <CustomDatePicker
                control={control}
                name="endDateFts"
                label="End Date"
              />
              <CustomButton
                title="Send Request"
                onPress={() => alert("Fetching Details...")}
              />
              <CustomButton
                title="Get Status"
                onPress={() => alert("Fetching Details...")}
              />
              <CustomDropDown
                control={control}
                name="ftsStatus"
                label="FTS Status"
                data={statusOptions}
              />
            </>
          )}
          <CustomButton
            title="Fetch Income Details"
            onPress={() => alert("Fetching Details...")}
          />
          <CustomInput
            control={control}
            name="bankName"
            label="Bank Name"
            placeholder="RAK Bank"
            type="text"
          />
          <CustomInput
            control={control}
            name="accountNo"
            label="Account No"
            placeholder="00090435412"
            type="text"
          />
          <CustomInput
            control={control}
            name="last6MonthsADB"
            label="Last 6 Months ADB"
            placeholder="2000"
            type="number"
          />
          <CustomInput
            control={control}
            name="last6MonthsAvgCredit"
            label="Last 6 Months Avg Credit"
            placeholder="2000"
            type="number"
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
