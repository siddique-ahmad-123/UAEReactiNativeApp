import CustomButton from "@/components/CustomButton";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import FormLayout from "@/components/Form/FormLayout";
import SectionHeader from "@/components/SectionHeader";
import SegmentedControl from "@/components/SegmentControl";
import { spacing } from "@/constants/Metrics";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { useForm } from "react-hook-form";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";

const CoBorrowerPersonalInformation = () => {
  const { updateField, nextStep, prevStep, formData } = useApplicationStore();
  const { control, handleSubmit, setValue, watch } = useForm({
    // resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData,
  });

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    nextStep();
  };

  const isCoBorrower = watch(fieldNames.isCoBorrower) ?? "No";

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
      subTitle={t("coBorrowerDetails")}
      noOfBars={2}
      activeBarIndex={1}
      onBack={() => prevStep()}
      onClose={() => router.push("/(main)/NavScreen")}
      onInfoPress={() => alert("Info about this step")}
      onSaveAndNext={handleSubmit(onSubmit)}
    >
      <SegmentedControl
        label="Do you want to add Co-Borrower"
        options={["Yes", "No"]}
        defaultValue={isCoBorrower}
        onChange={(v) => setValue(fieldNames.isCoBorrower, v)}
      />

      {isCoBorrower === "Yes" && (
        <>
          <View style={{ marginHorizontal: spacing.md }}>
            <Text style={{ textAlign: "center" }}>
              {
                "We need to verify the details of co-borrower, Please help in providing below mentioned details"
              }
            </Text>
          </View>

          <CustomInput
            control={control}
            name={fieldNames.coBorrowerName}
            label="EIDA No"
            placeholder="Enter your EIDA number"
            type="number"
          />

          <CustomInput
            control={control}
            name={fieldNames.coBorrowerMobileNo}
            label="Mobile No"
            placeholder="Enter your mobile number"
            type="number"
          />

          <CustomButton
            title={"Send OTP"}
            onPress={function (event: GestureResponderEvent): void {
              throw new Error("Function not implemented.");
            }}
          />

          <CustomInput
            control={control}
            name={fieldNames.coBorrowerOtp}
            label="Enter OTP"
            placeholder="Enter your OTP"
            type="number"
          />

          <CustomButton
            title={"Verify Details"}
            onPress={function (event: GestureResponderEvent): void {
              throw new Error("Function not implemented.");
            }}
          />

          <SectionHeader sectionName={t("personalInformation")} />
          <CustomInput
            control={control}
            name={fieldNames.coBorrowerName}
            label="Name"
            placeholder="Enter your name"
            type="text"
          />
          <CustomDatePicker
            name={fieldNames.coBorrowerDOB}
            control={control}
            label={"Date of Birth"}
          />
          <CustomInput
            control={control}
            name={fieldNames.coBorrowerAge}
            label="Age"
            placeholder="Age"
            type="number"
          />
          <CustomDropDown
            name={fieldNames.coBorrowerGender}
            label={"Gender"}
            data={genderOptions}
            control={control}
          />
          <CustomDropDown
            name={fieldNames.coBorrowerNationality}
            label={"Nationality"}
            data={nationalityOptions}
            control={control}
          />
          <CustomDropDown
            name={fieldNames.coBorrowerResidenceCountry}
            label={"Residence Country"}
            data={residenceCountryOptions}
            control={control}
          />
          <CustomInput
            control={control}
            name={fieldNames.coBorrowerEidaNo}
            label="EIDA No"
            placeholder="Enter your EIDA Number"
            type="number"
          />
          <CustomDatePicker
            name={fieldNames.coBorrowerEidaIssueDate}
            control={control}
            label={"EIDA Issue Date"}
          />
          <CustomDatePicker
            control={control}
            name={fieldNames.coBorrowerEidaExpiryDate}
            label={"EIDA Expiry Date"}
          />

          <CustomInput
            control={control}
            name={fieldNames.coBorrowerPassportNo}
            label="Passport No"
            placeholder="Enter your passport Number"
            type="number"
          />
          <CustomDatePicker
            control={control}
            name={fieldNames.coBorrowerPassportIssueDate}
            label={"Passport Issue Date"}
          />
          <CustomDatePicker
            control={control}
            name={fieldNames.coBorrowerPassportExpiryDate}
            label={"Passport Expiry Date"}
          />

          <CustomInput
            control={control}
            name={fieldNames.coBorrowerVisaNo}
            label="Visa No"
            placeholder="Enter your visa Number"
            type="number"
          />
          <CustomDatePicker
            control={control}
            name={fieldNames.coBorrowerVisaIssueDate}
            label={"Visa Issue Date"}
          />
          <CustomDatePicker
            control={control}
            name={fieldNames.coBorrowerVisaExpiryDate}
            label={"VIsa Expiry Date"}
          />

          <CustomInput
            control={control}
            name={fieldNames.coBorrowerEmailId}
            label="Email ID"
            placeholder="Enter your email id"
            type="email"
          />

          <CustomInput
            control={control}
            name={fieldNames.coBorrowerMobileNo}
            label="Mobile No"
            placeholder="Enter your mobile number"
            type="number"
          />

          <CustomInput
            control={control}
            name={fieldNames.coBorrowerResidenceVintage}
            label="Residence Vintage(Months)"
            placeholder="Enter your residence vintage"
            type="number"
          />

          <CustomInput
            control={control}
            name={fieldNames.coBorrowerNoOfDependents}
            label="No of Dependents"
            placeholder="Enter the number of dependents"
            type="number"
          />

          <SectionHeader sectionName={t("addressInformation")} />

          <CustomInput
            control={control}
            name={fieldNames.coBorrowerAddressLine1}
            label="Address Line 1"
            placeholder="Enter your address"
            type="text"
          />
          <CustomInput
            control={control}
            name={fieldNames.coBorrowerAddressLine2}
            label="Address Line 2"
            placeholder="Enter your address"
            type="text"
          />

          <CustomDropDown
            name={fieldNames.coBorrowerEmirates}
            label={"Emirates"}
            data={emiratesOptions}
            control={control}
          />
          <CustomDropDown
            name={fieldNames.coBorrowerCountry}
            label={"Country"}
            data={countryOptions}
            control={control}
          />

          <SectionHeader sectionName="EFR Check" />
          <CustomButton
            title={"Run EFR"}
            onPress={function (event: GestureResponderEvent): void {
              throw new Error("Function not implemented.");
            }}
          />

          <CustomDropDown
            name={fieldNames.coBorrowerVerificationStatus}
            label={"Verification Status"}
            data={verificationOptions}
            control={control}
          />

          <CustomButton
            title={"Check Status"}
            onPress={function (event: GestureResponderEvent): void {
              throw new Error("Function not implemented.");
            }}
          />
        </>
      )}
    </FormLayout>
  );
};

export default CoBorrowerPersonalInformation;

const styles = StyleSheet.create({});
