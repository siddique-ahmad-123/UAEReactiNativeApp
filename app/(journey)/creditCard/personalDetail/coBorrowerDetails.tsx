import CustomButton from "@/components/CustomButton";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import FormLayout from "@/components/Form/FormLayout";
import SectionHeader from "@/components/SectionHeader";
import SegmentedControl from "@/components/SegmentControl";
import { spacing } from "@/constants/Metrics";
import { personalDetailsSchema } from "@/schemas/creditCard/personalDetailsSchema";
import { useApplicationStore } from "@/store/applicationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";

const coBorrowerPersonalInformation = ({ navigation }: any) => {
  const { updateField, nextStep, prevStep, formData } = useApplicationStore();
  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      //   incomeType: formData.incomeType || "Salaried",
      //   empDetailFetchMethod: formData.empDetailFetchMethod || "AECB",
    },
    shouldUnregister: true,
  });

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    nextStep();
  };

  const coBorrower = watch("coBorrower") ?? "Yes";

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
      onBack={() => prevStep}
      onClose={() => navigation.navigate("Home")}
      onInfoPress={() => alert("Info about this step")}
      onSaveAndNext={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="coBorrower"
        defaultValue="No"
        render={({ field: { onChange, coBorrower } }) => (
          <SegmentedControl
            label="Do you want to add Co-Borrower"
            options={["Yes", "No"]}
            defaultValue={"No"}
            onChange={onChange}
          />
        )}
      />

      {coBorrower === "Yes" && (
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
            name="eidaNo"
            label="EIDA No"
            placeholder="Enter your EIDA number"
            type="number"
          />

          <CustomInput
            control={control}
            name="mobileNo"
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
            name=""
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
            name="name"
            label="Name"
            placeholder="Enter your name"
            type="text"
          />
          <CustomDatePicker
            control={control}
            name="dob"
            label={"Date of Birth"}
          />
          <CustomInput
            control={control}
            name="age"
            label="Age"
            placeholder="Age"
            type="number"
          />
          <CustomDropDown label={"Gender"} data={genderOptions} />
          <CustomDropDown label={"Nationality"} data={nationalityOptions} />
          <CustomDropDown
            label={"Residence Country"}
            data={residenceCountryOptions}
          />
          <CustomInput
            control={control}
            name="eidaNo"
            label="EIDA No"
            placeholder="Enter your EIDA Number"
            type="number"
          />
          <CustomDatePicker
            control={control}
            name="eidaIssueDate"
            label={"EIDA Issue Date"}
          />
          <CustomDatePicker
            control={control}
            name="eidaExpiryDate"
            label={"EIDA Expiry Date"}
          />

          <CustomInput
            control={control}
            name="passportNo"
            label="Passport No"
            placeholder="Enter your passport Number"
            type="number"
          />
          <CustomDatePicker
            control={control}
            name="passportIssueDate"
            label={"Passport Issue Date"}
          />
          <CustomDatePicker
            control={control}
            name="passportExpiryDate"
            label={"Passport Expiry Date"}
          />

          <CustomInput
            control={control}
            name="visaNo"
            label="Visa No"
            placeholder="Enter your visa Number"
            type="number"
          />
          <CustomDatePicker
            control={control}
            name="visaIssueDate"
            label={"Visa Issue Date"}
          />
          <CustomDatePicker
            control={control}
            name="visaExpiryDate"
            label={"VIsa Expiry Date"}
          />

          <CustomInput
            control={control}
            name="emailId"
            label="Email ID"
            placeholder="Enter your email id"
            type="email"
          />

          <CustomInput
            control={control}
            name="visaNo"
            label="Mobile No"
            placeholder="Enter your mobile number"
            type="number"
          />

          <CustomInput
            control={control}
            name="residenceVintage"
            label="Residence Vintage(Months)"
            placeholder="Enter your residence vintage"
            type="number"
          />

          <CustomInput
            control={control}
            name="noOfDependents"
            label="No of Dependents"
            placeholder="Enter the number of dependents"
            type="number"
          />

          <SectionHeader sectionName={t("addressInformation")} />

          <CustomInput
            control={control}
            name="addressLine1"
            label="Address Line 1"
            placeholder="Enter your address"
            type="text"
          />
          <CustomInput
            control={control}
            name="addressLine2"
            label="Address Line 2"
            placeholder="Enter your address"
            type="text"
          />

          <CustomDropDown label={"Emirates"} data={emiratesOptions} />
          <CustomDropDown label={"Country"} data={countryOptions} />

          <SectionHeader sectionName="EFR Check" />
          <CustomButton
            title={"Run EFR"}
            onPress={function (event: GestureResponderEvent): void {
              throw new Error("Function not implemented.");
            }}
          />

          <CustomDropDown
            label={"Verification Status"}
            data={verificationOptions}
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

export default coBorrowerPersonalInformation;

const styles = StyleSheet.create({});
