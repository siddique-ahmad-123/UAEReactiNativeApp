import CustomUpload from "@/components/CustomUpload";
import FormLayout from "@/components/Form/FormLayout";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

const AdditionalDocUpload = () => {
  const { updateField, nextStep, prevStep, formData } = useApplicationStore();
  const { control, handleSubmit, setValue, watch } = useForm({
    // resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData,
  });

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    nextStep();
  };

  const borrowerType = watch("borrowerType") ?? "Borrower";
  return (
    <FormLayout
      stepNumber={4}
      title={t("additionalDocuments")}
      subTitle={t("documentsUpload")}
      noOfBars={1}
      activeBarIndex={1}
      onBack={() => prevStep()}
      onClose={() => router.push("/")}
      onInfoPress={() => alert("Info about this step")}
      onSaveAndNext={handleSubmit(onSubmit)}
    >
      {/* <SegmentedControl
        label={"Select Applicant"}
        options={["Borrower", "Co-Borrower"]}
        defaultValue={borrowerType}
        onChange={(value) => setValue("borrowerType", value)}
      /> */}

      {borrowerType === "Borrower" ? (
        <>
          {/* Borrower Upload  */}
          <CustomUpload label={"Salary Certificate"} />
          <CustomUpload label={"Bank Statement"} />
          <CustomUpload label={"Additional Income Proof"} />
          <CustomUpload label={"Trade License"} />
        </>
      ) : (
        <>
          {/* Co-Borrower Upload */}
          <CustomUpload label={"Salary Certificate"} />
          <CustomUpload label={"Bank Statement"} />
          <CustomUpload label={"Additional Income Proof"} />
          <CustomUpload label={"Trade License"} />
        </>
      )}
    </FormLayout>
  );
};

export default AdditionalDocUpload;

const styles = StyleSheet.create({});
