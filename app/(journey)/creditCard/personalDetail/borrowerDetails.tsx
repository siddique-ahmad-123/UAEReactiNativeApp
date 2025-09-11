import CustomButton from "@/components/CustomButton";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import CustomUpload from "@/components/CustomUpload";
import FormLayout from "@/components/Form/FormLayout";
import SectionHeader from "@/components/SectionHeader";
import SegmentedControl from "@/components/SegmentControl";
import { spacingVertical } from "@/constants/Metrics";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { useForm } from "react-hook-form";
import { GestureResponderEvent, StyleSheet, View } from "react-native";

const BorrowerPersonalInformation = () => {
  const { updateField, nextStep, prevStep, formData } = useApplicationStore();
  const { control, handleSubmit, setValue, watch } = useForm({
    // resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData,
    shouldUnregister: true,
  });

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    nextStep();
  };

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Others", value: "Others" },
  ];

  const residenceCountryOptions = [
    { label: "India", value: "IN" },
    { label: "United States", value: "US" },
    { label: "Germany", value: "DE" },
  ];

  const nationalityOptions = [
    { label: "Indian", value: "India" },
    { label: "Persians", value: "Persians" },
  ];

  const emiratesOptions = [
    { label: "Dubai", value: "Dubai" },
    { label: "Saudi Arabia", value: "Saudi Arabia" },
  ];
  const countryOptions = [
    { label: "India", value: "IN" },
    { label: "United States", value: "US" },
    { label: "Germany", value: "DE" },
  ];
  const verificationOptions = [
    { label: "Initiated", value: "Initiated" },
    { label: "Pending", value: "Pending" },
    { label: "Verified", value: "Verified" },
  ];

  return (
    <FormLayout
      stepNumber={1}
      title={t("personalDetails")}
      subTitle={t("borrowerDetails")}
      noOfBars={2}
      activeBarIndex={0}
      onBack={() => prevStep()}
      onClose={() => router.push("/")}
      onInfoPress={() => alert("Info about this step")}
      onSaveAndNext={handleSubmit(onSubmit)}
    >
      <SegmentedControl
        label={"Nationality Status"}
        options={["Emirati", "Expat"]}
        onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
      />

      <View style={{ alignItems: "center", gap: spacingVertical.md }}>
        <CustomUpload label={"Emirates ID"} />
        <CustomUpload label={"Passport"} />
        <CustomUpload label={"Visa"} />
      </View>

      <CustomButton
        title={"Fetch Details"}
        onPress={function (event: GestureResponderEvent): void {
          throw new Error("Function not implemented.");
        }}
      />

      <SectionHeader sectionName={t("personalInformation")} />
      <CustomInput
        control={control}
        name={fieldNames.borrowerName}
        label="Name"
        placeholder="Name"
        type="text"
      />
      <CustomDatePicker
        control={control}
        name={fieldNames.borrowerDOB}
        label={"Date of Birth"}
      />
      <CustomInput
        control={control}
        name={fieldNames.borrowerAge}
        label="Age"
        placeholder="Age"
        type="number"
      />
      <CustomDropDown
        name={fieldNames.borrowerGender}
        label={"Gender"}
        data={genderOptions}
        control={control}
      />
      <CustomDropDown
        name={fieldNames.borrowerNationality}
        label={"Nationality"}
        data={nationalityOptions}
        control={control}
      />
      <CustomDropDown
        name={fieldNames.borrowerResidenceCountry}
        label={"Residence Country"}
        data={residenceCountryOptions}
        control={control}
      />
      <CustomInput
        control={control}
        name={fieldNames.borrowerEidaNo}
        label="EIDA No"
        placeholder="Enter your EIDA Number"
        type="number"
      />
      <CustomDatePicker
        control={control}
        name={fieldNames.borrowerEidaIssueDate}
        label={"EIDA Issue Date"}
      />
      <CustomDatePicker
        control={control}
        name={fieldNames.borrowerEidaExpiryDate}
        label={"EIDA Expiry Date"}
      />

      <CustomInput
        control={control}
        name={fieldNames.borrowerPassportNo}
        label="Passport No"
        placeholder="Enter your passport Number"
        type="number"
      />
      <CustomDatePicker
        control={control}
        name={fieldNames.borrowerPassportIssueDate}
        label={"Passport Issue Date"}
      />
      <CustomDatePicker
        control={control}
        name={fieldNames.borrowerPassportExpiryDate}
        label={"Passport Expiry Date"}
      />

      <CustomInput
        control={control}
        name={fieldNames.borrowerVisaNo}
        label="Visa No"
        placeholder="Enter your visa Number"
        type="number"
      />
      <CustomDatePicker
        control={control}
        name={fieldNames.borrowerVisaIssueDate}
        label={"Visa Issue Date"}
      />
      <CustomDatePicker
        control={control}
        name={fieldNames.borrowerVisaExpiryDate}
        label={"VIsa Expiry Date"}
      />

      <CustomInput
        control={control}
        name={fieldNames.borrowerEmailId}
        label="Email ID"
        placeholder="Enter your email id"
        type="email"
      />

      <CustomInput
        control={control}
        name={fieldNames.borrowerMobileNo}
        label="Mobile No"
        placeholder="Enter your mobile number"
        type="number"
      />

      <CustomInput
        control={control}
        name={fieldNames.borrowerVintage}
        label="Residence Vintage(Months)"
        placeholder="Enter your residence vintage"
        type="number"
      />

      <CustomInput
        control={control}
        name={fieldNames.borrowerNoOfDependents}
        label="No of Dependents"
        placeholder="Enter the number of dependents"
        type="number"
      />

      <SectionHeader sectionName={t("addressInformation")} />

      <CustomInput
        control={control}
        name={fieldNames.borrowerAddressLine1}
        label="Address Line 1"
        placeholder="Enter your address"
        type="text"
      />
      <CustomInput
        control={control}
        name={fieldNames.borrowerAddressLine2}
        label="Address Line 2"
        placeholder="Enter your address"
        type="text"
      />

      <CustomDropDown
        name={fieldNames.borrowerEmirates}
        label={"Emirates"}
        data={emiratesOptions}
        control={control}
      />
      <CustomDropDown
        name={fieldNames.borrowerCountry}
        label={"Country"}
        data={countryOptions}
        control={control}
      />

      <SectionHeader sectionName="EFR Check" />
      <CustomButton
        title={"RUN EFR"}
        onPress={function (event: GestureResponderEvent): void {
          throw new Error("Function not implemented.");
        }}
      />
      <CustomDropDown
        name={fieldNames.borrowerVerificationStatus}
        label={"Verification Status"}
        data={verificationOptions}
        control={control}
      />
    </FormLayout>
  );
};

export default BorrowerPersonalInformation;

const styles = StyleSheet.create({});
