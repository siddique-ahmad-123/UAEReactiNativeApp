import CustomUpload from "@/components/CustomUpload";
import FormLayout from "@/components/Form/FormLayout";
import SegmentedControl from "@/components/SegmentControl";
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
    shouldUnregister: true,
  });

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    nextStep();
  };
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
      <SegmentedControl
        label={"Select Applicant"}
        options={["Borrower", "Co-Borrower"]}
        onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
      />

      {/* Borrower Upload  */}
      <CustomUpload label={"Salary Certificate"} />
      <CustomUpload label={"Bank Statement"} />
      <CustomUpload label={"Additional Income Proof"} />
      <CustomUpload label={"Trade License"} />

      {/* Co-Borrower Upload */}
      <CustomUpload label={"Salary Certificate"} />
      <CustomUpload label={"Bank Statement"} />
      <CustomUpload label={"Additional Income Proof"} />
      <CustomUpload label={"Trade License"} />
    </FormLayout>
  );
};

export default AdditionalDocUpload;

const styles = StyleSheet.create({});
