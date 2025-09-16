import CustomUpload from "@/components/CustomUpload";
import FormLayout from "@/components/Form/FormLayout";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import { t } from "i18next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
        <>
          {/* Borrower Upload  */}
          <CustomUpload label={"Salary Certificate"} control={control} name="SalaryCertificate"/>
          <CustomUpload label={"Bank Statement"} control={control} name="BankStatement"/>
          <CustomUpload label={"Additional Income Proof"}  control={control} name="AdditionalIncomeProof"/>
          <CustomUpload label={"Trade License"} control={control} name="TradeLicense"/>
        </>
    </FormLayout>
  );
};

export default AdditionalDocUpload;
