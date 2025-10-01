import CustomButton from "@/components/CustomButton";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import CustomUpload from "@/components/CustomUpload";
import FormLayout from "@/components/Form/FormLayout";
import SectionHeader from "@/components/SectionHeader";
import SegmentedControl from "@/components/SegmentControl";
import { spacingVertical } from "@/constants/Metrics";
import {
  useEmiratesIdMutation,
  useGetEmiratesDropDownValuesQuery,
  useGetExistingCustomerDataMutation,
  usePassportMutation,
  useVisaMutation,
} from "@/redux/api/creditCardAPI";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { placeHoldersNames } from "@/schemas/creditCard/allFieldsPlaceholder";
import { useApplicationStore } from "@/store/applicationStore";
import calculateAge from "@/utils/calculateAge";
import {
  parseFromDDMMYYYYWithSlash,
  parseFromYYYYMMDDWithSlash,
  parseToDate,
} from "@/utils/dateParser";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const BorrowerPersonalInformation = () => {
  const [isloading, setIsLoading] = useState(false);
  const [isloading1, setIsLoading1] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraRef, setCameraRef] = useState<any>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const [emiratesIdOCR] = useEmiratesIdMutation();
  const [visaOCR] = useVisaMutation();
  const [passportOCR] = usePassportMutation();
  const [getExistingCustomerData] = useGetExistingCustomerDataMutation();

  const { updateField, nextStep, prevStep, formData } = useApplicationStore();
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: formData,
  });

  useEffect(() => {
    const fetchAndPopulate = async () => {
      try {
        const response: any = await getExistingCustomerData(
          formData[fieldNames.mobileNo]
        ).unwrap();
        if (response?.status === 200 && response?.data?.customerData?.length) {
          const customer = response.data.customerData[0];
          // Object.entries(customerDataMapper).forEach(([apiKey, formField]) => {
          //   const value = customer[apiKey];
          //   if (value !== undefined && value !== null) {
          //     setValue(formField, value, { shouldValidate: false });
          //   }
          // });
          setValue(fieldNames.borrowerName, customer.Name);
          setValue(
            fieldNames.borrowerDOB,
            parseFromDDMMYYYYWithSlash(customer.DOB)
          );
          setValue(fieldNames.borrowerGender, customer.Gender);
          setValue(fieldNames.borrowerNationality, customer.Nationality);
          setValue(
            fieldNames.borrowerResidenceCountry,
            customer["Residence Country"]
          );
          setValue(fieldNames.borrowerEidaNo, customer.EIDA_No);
          setValue(
            fieldNames.borrowerEidaIssueDate,
            parseFromDDMMYYYYWithSlash(customer.EIDA_Issue_Date)
          );
          setValue(
            fieldNames.borrowerEidaExpiryDate,
            parseFromDDMMYYYYWithSlash(customer.EIDA_Expiry_Date)
          );
          setValue(fieldNames.borrowerPassportNo, customer.Passport_No);
          setValue(
            fieldNames.borrowerPassportIssueDate,
            parseFromDDMMYYYYWithSlash(customer.Passport_Issue_Date)
          );
          setValue(
            fieldNames.borrowerPassportExpiryDate,
            parseFromDDMMYYYYWithSlash(customer.Passport_Expiry_Date)
          );
          setValue(fieldNames.borrowerVisaNo, customer.Visa_No);
          setValue(
            fieldNames.borrowerVisaIssueDate,
            parseFromDDMMYYYYWithSlash(customer.Visa_Issue_Date)
          );
          setValue(
            fieldNames.borrowerVisaExpiryDate,
            parseFromDDMMYYYYWithSlash(customer.Visa_Expiry_Date)
          );
          setValue(fieldNames.borrowerEmailId, customer.Email_ID);
          setValue(fieldNames.borrowerMobileNo, customer.Mobile_No);
          setValue(fieldNames.borrowerAddressLine1, customer.Address_Line_1);
          setValue(fieldNames.borrowerAddressLine2, customer.Address_Line_2);
          setValue(fieldNames.borrowerEmirates, customer.Emirates);
          setValue(fieldNames.borrowerCountry, customer.Country);
          if (customer.DOB) {
            const tempDob = parseFromDDMMYYYYWithSlash(customer.DOB) || "";
            const dob = new Date(tempDob.split("/").reverse().join("/"));
            const age = calculateAge(dob);
            setValue(fieldNames.borrowerAge, age);
          }
        }
      } catch (err) {
        console.error("❌ Failed to fetch customer data", err);
      }
    };
    if (!formData[fieldNames.borrowerName]) {
      fetchAndPopulate();
    }
  }, []);

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    nextStep();
  };

  const borrowerNationalityStatus =
    watch(fieldNames.borrowerNationalityStatus) ?? "Emirati";

  const handleFetchDetails = async () => {
    setIsLoading1(true);
    const emirateResponse = await emiratesIdOCR(
      formData[fieldNames.mobileNo]
    ).unwrap();
    const passportResponse = await passportOCR(
      formData[fieldNames.mobileNo]
    ).unwrap();
    if (emirateResponse.status == 200 && passportResponse.status == 200) {
      setValue(fieldNames.borrowerName, emirateResponse.data.name);
      setValue(
        fieldNames.borrowerDOB,
        parseFromDDMMYYYYWithSlash(emirateResponse.data.dob)
      );
      setValue(fieldNames.borrowerGender, emirateResponse.data.gender);
      setValue(
        fieldNames.borrowerNationality,
        emirateResponse.data.nationality
      );
      setValue(
        fieldNames.borrowerEidaIssueDate,
        parseFromDDMMYYYYWithSlash(emirateResponse.data.eidaIssueDate)
      );
      setValue(
        fieldNames.borrowerEidaExpiryDate,
        parseFromDDMMYYYYWithSlash(emirateResponse.data.eidaExpiryDate)
      );
      setValue(
        fieldNames.borrowerAge,
        calculateAge(parseToDate(emirateResponse.data.dob))
      );
      setValue(fieldNames.borrowerPassportNo, passportResponse.data.passportNo);
      setValue(
        fieldNames.borrowerPassportIssueDate,
        parseToDate(passportResponse.data.passportIssueDate)
      );
      setValue(
        fieldNames.borrowerPassportExpiryDate,
        parseToDate(passportResponse.data.passportExpiryDate)
      );
    }
    if (borrowerNationalityStatus === "Expat") {
      const visaResponse = await visaOCR(
        formData[fieldNames.mobileNo]
      ).unwrap();
      if (visaResponse.status === 200) {
        setValue(fieldNames.borrowerVisaNo, visaResponse.data.visaNo);
        setValue(
          fieldNames.borrowerVisaIssueDate,
          parseFromYYYYMMDDWithSlash(visaResponse.data.visaIssueDate)
        );
        setValue(
          fieldNames.borrowerVisaExpiryDate,
          parseFromYYYYMMDDWithSlash(visaResponse.data.visaExpiryDate)
        );
      }
    }
    setIsLoading1(false);
  };

  // 🔹 Updated EFR function with Camera
  const runEFR = async () => {
    setIsLoading(true);
    if (!permission?.granted) {
      const perm = await requestPermission();
      if (!perm.granted) {
        alert("Camera permission denied");
        setIsLoading(false);
        return;
      }
    }
    setShowCamera(true);
  };

  const capturePhoto = async () => {
    if (cameraRef) {
      try {
        await cameraRef.takePictureAsync();
        setShowCamera(false);
        setValue("borrowerVerificationStatus", "Pending");
        setTimeout(() => {
          setValue("borrowerVerificationStatus", "Verified");
          setIsLoading(false);
        }, 3000);
      } catch (err) {
        console.error("❌ Failed to capture photo", err);
        setIsLoading(false);
      }
    }
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
    { label: "United Arab Emirates", value: "United Arab Emirates" },
    { label: "Sri Lanka", value: "Sri Lanka" },
  ];

  const nationalityOptions = [
    { label: "Indian", value: "Indian" },
    { label: "Sri Lanka", value: "Sri Lanka" },
    { label: "UAE", value: "UAE" },
  ];

  const { data: emirates } = useGetEmiratesDropDownValuesQuery();

  const emiratesOptions = emirates?.data ?? [
    {
      label: "Abu Dhabi",
      value: "Abu Dhabi",
    },
    {
      label: "Ajman",
      value: "Ajman",
    },
    {
      label: "Dubai",
      value: "Dubai",
    },
  ];

  const countryOptions = [
    { label: "India", value: "IN" },
    { label: "United Arab Emirates", value: "United Arab Emirates" },
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
      {formData[fieldNames.userType] === "NTB" && (
        <>
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
            <CustomUpload
              label={"Passport"}
              control={control}
              name="passport"
            />
            {borrowerNationalityStatus === "Expat" && (
              <CustomUpload label={"Visa"} control={control} name="visa" />
            )}
          </View>

          <CustomButton
            title={"Fetch Details"}
            onPress={handleFetchDetails}
            isloading={isloading1}
          />
        </>
      )}
      <SectionHeader sectionName="Personal Information" />
      <CustomInput
        control={control}
        name={fieldNames.borrowerName}
        label="Name"
        placeholder={placeHoldersNames.Name}
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
        placeholder={placeHoldersNames.Age}
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
        name={fieldNames.borrowerEmiratesId}
        label="EIDA No"
        placeholder={placeHoldersNames.EIDA}
        maxLength={15}
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
        placeholder={placeHoldersNames.PassportNumber}
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
      {(borrowerNationalityStatus === "Expat" ||
        formData[fieldNames.userType] === "ETB") && (
        <>
          <CustomInput
            control={control}
            name={fieldNames.borrowerVisaNo}
            label="Visa No"
            placeholder={placeHoldersNames.VisaNumber}
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
        </>
      )}
      <CustomInput
        control={control}
        name={fieldNames.borrowerEmailId}
        label="Email ID"
        placeholder={placeHoldersNames.Email}
        type="email"
      />

      <CustomInput
        control={control}
        name={fieldNames.borrowerMobileNo}
        label="Mobile No"
        placeholder={placeHoldersNames.MobileNumber}
        type="number"
      />

      <CustomInput
        control={control}
        name={fieldNames.borrowerVintage}
        label="Residence Vintage(Months)"
        placeholder={placeHoldersNames.ResidenceVintage}
        type="number"
      />

      <CustomInput
        control={control}
        name={fieldNames.borrowerNoOfDependents}
        label="No of Dependents"
        placeholder={placeHoldersNames.DependentsNumber}
        type="number"
      />

      <SectionHeader sectionName={t("addressInformation")} />

      <CustomInput
        control={control}
        name={fieldNames.borrowerAddressLine1}
        label="Address Line 1"
        placeholder={placeHoldersNames.Address}
        type="text"
      />
      <CustomInput
        control={control}
        name={fieldNames.borrowerAddressLine2}
        label="Address Line 2"
        placeholder={placeHoldersNames.Address}
        type="text"
      />

      <CustomDropDown
        name={fieldNames.borrowerEmirates}
        label="Emirates"
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

      {/* 🔹 Camera Modal */}
      <Modal visible={showCamera} animationType="slide">
        <CameraView
          style={{ flex: 1 }}
          facing="front"
          ref={(ref) => setCameraRef(ref)}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 40,
            alignSelf: "center",
            backgroundColor: "white",
            padding: 16,
            borderRadius: 50,
          }}
          onPress={capturePhoto}
        >
          <Text style={{ fontWeight: "bold" }}>📸 Capture</Text>
        </TouchableOpacity>
      </Modal>
    </FormLayout>
  );
};

export default BorrowerPersonalInformation;

const styles = StyleSheet.create({});
