import CustomUpload from "@/components/CustomUpload";
import FormLayout from "@/components/Form/FormLayout";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import { t } from "i18next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

const AdditionalDocUpload = () => {
  const [visa, setVisa] = useState<string | null>(null);
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
          <CustomUpload label={"Salary Certificate"} onFilePicked={(uri) => setVisa(uri)} />
          <CustomUpload label={"Bank Statement"} onFilePicked={(uri) => setVisa(uri)} />
          <CustomUpload label={"Additional Income Proof"} onFilePicked={(uri) => setVisa(uri)} />
          <CustomUpload label={"Trade License"} onFilePicked={(uri) => setVisa(uri)} />
        </>
      ) : (
        <>
          {/* Co-Borrower Upload */}
          <CustomUpload label={"Salary Certificate"} onFilePicked={(uri) => setVisa(uri)} />
          <CustomUpload label={"Bank Statement"} onFilePicked={(uri) => setVisa(uri)} />
          <CustomUpload label={"Additional Income Proof"} onFilePicked={(uri) => setVisa(uri)}/>
          <CustomUpload label={"Trade License"}onFilePicked={(uri) => setVisa(uri)} />
        </>
      )}
    </FormLayout>
  );
};

export default AdditionalDocUpload;

const styles = StyleSheet.create({});
