import FormLayout from "@/components/Form/FormLayout";
import StepCard from "@/components/StepCard";
import { useOfferLetterMutation, useUaeCreditCardMutation } from "@/redux/api/creditCardAPI";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import { t } from "i18next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

const ApplicationSummary = () => {
  const { updateField, prevStep, formData } = useApplicationStore();
  const [uaeCreditCard] = useUaeCreditCardMutation();
  const [offerLetter] = useOfferLetterMutation();
  const { handleSubmit, setValue,  } = useForm({
    // resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData,
  });
  
 const [isLoading, setIsLoading] = useState(false);
 const onSubmit = async (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));

    setIsLoading(true); 
    await new Promise((resolve) => setTimeout(resolve, 3000)); 
    await onSubmitApplication();
    setIsLoading(false); 
  };

  const onSubmitApplication = async () => {
    const response = await uaeCreditCard(formData).unwrap();
    console.log("✅ Server Response:", response);

    if (response.status === 200) {
      const offerType = response.data?.offerType;

      if (offerType === "Approved") {
        setValue(fieldNames.cardLimit, response.data.creditLimit);
        updateField(fieldNames.cardLimit, response.data.creditLimit);
        await offerLetter(formData);
        router.push(
          "/(journey)/creditCard/submitApplication/applicationApproved"
        );
      } else if (offerType === "Not Approved") {
        setValue(fieldNames.cardLimit, response.data.creditLimit);
        updateField(fieldNames.cardLimit, response.data.creditLimit);
        router.push(
          "/(journey)/creditCard/submitApplication/applicationNotApproved"
        );
      } else if (offerType === "Counter Offer") {
        setValue(fieldNames.cardLimit, response.data.creditLimit);
        updateField(fieldNames.cardLimit, response.data.creditLimit);
        router.push("/(journey)/creditCard/submitApplication/counterOffer");
      } else {
        router.replace("/(main)/NavScreen");
      }
    } else {
      console.error(" Unexpected response:", response);
    }
    
  };

  const styles = StyleSheet.create({});
  return (
    <FormLayout
      stepNumber={6}
      title={t("applicationSummary")}
      subTitle={t("summary")}
      noOfBars={1}
      activeBarIndex={1}
      onBack={() => prevStep()}
      onClose={() => router.push("/(main)/NavScreen")}
      onInfoPress={() => alert("Info about this step")}
      onSaveAndNext={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <StepCard
        stepNumber={1}
        label={"Personal Details"}
        path={"/(journey)/creditCard/applicationSummary/personalSummary"}
        completed={true}
      />
      <StepCard
        stepNumber={2}
        label={"Income & Occupation Details"}
        path={"/(journey)/creditCard/applicationSummary/incomeSummary"}
        completed={true}
      />
      <StepCard
        stepNumber={3}
        label={"Expense Details"}
        path={"/(journey)/creditCard/applicationSummary/expenseSummary"}
        completed={true}
      />
      <StepCard
        stepNumber={4}
        label={"Dispatch Details"}
        path={"/(journey)/creditCard/applicationSummary/dispatchSummary"}
        completed={true}
      />
    </FormLayout>
  );
};

export default ApplicationSummary;
