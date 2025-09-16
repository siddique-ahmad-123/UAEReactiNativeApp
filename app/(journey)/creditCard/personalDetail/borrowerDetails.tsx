import CustomButton from "@/components/CustomButton";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import CustomUpload from "@/components/CustomUpload";
import FormLayout from "@/components/Form/FormLayout";
import SectionHeader from "@/components/SectionHeader";
import SegmentedControl from "@/components/SegmentControl";
import { spacingVertical } from "@/constants/Metrics";
import { useEmiratesIdMutation, usePassportMutation, useVisaMutation } from "@/redux/api/creditCardAPI";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import calculateAge from "@/utils/calculateAge";
import { router, useLocalSearchParams } from "expo-router";
import { t } from "i18next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {StyleSheet, View } from "react-native";
import { useGetExistingCustomerDataMutation } from "@/redux/api/creditCardAPI";
import { useEffect } from "react";
import { customerDataMapper } from "@/schemas/burrowerDataMapper";


const BorrowerPersonalInformation = () => {
  const [isloading, setIsLoading] = useState(false);
  const [isloading1, setIsLoading1] = useState(false);
  const [emiratesIdOCR] = useEmiratesIdMutation();
  const [visaOCR] = useVisaMutation();
  const [passportOCR] = usePassportMutation();
  const { updateField, nextStep, prevStep, formData } = useApplicationStore();
  const { control, handleSubmit, setValue, watch } = useForm({
    // resolver: zodResolver(borrowerSchema),
    defaultValues: formData,
  });
 const { mobile } = useLocalSearchParams<{ mobile?: string; otp?: string }>();
  const [getExistingCustomerData] = useGetExistingCustomerDataMutation();

  useEffect(() => {
    console.log(mobile);
  const fetchAndPopulate = async () => {
    try {

const response: any = await getExistingCustomerData(formData[fieldNames.mobileNo]).unwrap();
console.log(response.data.customerData);
      if (response?.status === 200 && response?.data?.customerData?.length) {
        
        const customer = response.data.customerData[0];

        // Map API → form fields
        Object.entries(customerDataMapper).forEach(([apiKey, formField]) => {
          const value = customer[apiKey];
          if (value !== undefined && value !== null) {
            setValue(formField, value, { shouldValidate: false });
            updateField(formField, value);
          }
        });

        // Auto-calc age if DOB exists
        if (customer.DOB) {
          const dob = new Date(customer.DOB.split("-").reverse().join("-"));
          const age = calculateAge(dob);
          setValue(fieldNames.borrowerAge, age);
          updateField(fieldNames.borrowerAge, age);
        }
      }
    } catch (err) {
      console.error("❌ Failed to fetch customer data", err);
    }
  };

  fetchAndPopulate();
}, []);


  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    console.log("Store formData:", formData);
    nextStep();
  };

  const borrowerNationalityStatus =
    watch(fieldNames.borrowerNationalityStatus) ?? "Emirati";

    

  const handleFetchDetails = async() => {
    setIsLoading1(true);
    const emirateResponse = await emiratesIdOCR(formData[fieldNames.mobileNo]).unwrap();
    const visaResponse = await visaOCR(formData[fieldNames.mobileNo]).unwrap();
    const passportResponse = await passportOCR(formData[fieldNames.mobileNo]).unwrap();

    if(emirateResponse.status==200 && visaResponse.status==200 && passportResponse.status==200) {
      setValue(fieldNames.borrowerName,emirateResponse.data.name);
    }else{

    }
    setIsLoading1(false);
  };
  const runEFR = () => {
    setIsLoading(true);
    setTimeout(() => {
      setValue("borrowerVerificationStatus", "Verified");
      setIsLoading(false);
    }, 2000);
  };
  const calcAge = (date: Date | null) => {
    setValue("borrowerAge", calculateAge(date));
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
      noOfBars={1}
      activeBarIndex={0}
      onBack={() => prevStep()}
      onClose={() => router.push("/(main)/NavScreen")}
      onInfoPress={() => alert("Info about this step")}
      onSaveAndNext={handleSubmit(onSubmit)}
    >
      <SegmentedControl
        label={"Nationality Status"}
        options={["Emirati", "Expat"]}
        defaultValue={borrowerNationalityStatus}
        onChange={(value) =>
          setValue(fieldNames.borrowerNationalityStatus, value)
        }
      />

      <View style={{ alignItems: "center", gap: spacingVertical.md }}>
        <CustomUpload
          label={"Emirates ID"}
          control={control}
          name="emiratesID"
        />
        <CustomUpload label={"Passport"} control={control} name="passport" />
        {borrowerNationalityStatus === "Expat" ? (
          <>
            <CustomUpload label={"Visa"} control={control} name="visa" />
          </>
        ) : (
          <></>
        )}
      </View>

      <CustomButton
        title={"Fetch Details"}
        onPress={handleFetchDetails}
        isloading={isloading1}
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
        onChangePicker={calcAge}
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
        maxDate={new Date()}
      />
      <CustomDatePicker
        control={control}
        name={fieldNames.borrowerEidaExpiryDate}
        label={"EIDA Expiry Date"}
        minDate={watch(fieldNames.borrowerEidaIssueDate)}
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
        maxDate={new Date()}
      />
      <CustomDatePicker
        control={control}
        name={fieldNames.borrowerPassportExpiryDate}
        label={"Passport Expiry Date"}
        minDate={watch(fieldNames.borrowerPassportIssueDate)}
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
        maxDate={new Date()}
      />
      <CustomDatePicker
        control={control}
        name={fieldNames.borrowerVisaExpiryDate}
        label={"VIsa Expiry Date"}
        minDate={watch(fieldNames.borrowerVisaIssueDate)}
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
      <CustomButton title={"RUN EFR"} onPress={runEFR} isloading={isloading} />
      <CustomDropDown
        name={fieldNames.borrowerVerificationStatus}
        label={"Verification Status"}
        data={verificationOptions}
        control={control}
        disable={true}
      />
    </FormLayout>
  );
};

export default BorrowerPersonalInformation;

const styles = StyleSheet.create({});
