import FormLayout from "@/components/Form/FormLayout";
import StepCard from "@/components/StepCard";
import { useUserEligibilityCheckMutation } from "@/redux/api/creditCardAPI";
import { useApplicationStore } from "@/store/applicationStore";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { isReanimated3 } from "react-native-reanimated";

const ApplicationSummary = () => {
  const { updateField, nextStep, prevStep, formData } = useApplicationStore();
   const [userEligibilityCheck] = useUserEligibilityCheckMutation();
  const { control, handleSubmit, setValue, watch } = useForm({
    // resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData,
  });

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    onSubmitApplication();
  };

   const onSubmitApplication = async () => {
  const response = await userEligibilityCheck(formData).unwrap();
  console.log("✅ Server Response:", response);

  if (response.status === 200) {
    const offerType = response.data?.offerType;

    if (offerType === "Approved") {
      router.push("/(journey)/creditCard/submitApplication/applicationApproved");
    } else if (offerType === "Not Approved") {
      router.push("/(journey)/creditCard/submitApplication/applicationNotApproved");
    } else if (offerType === "Counter Offer") {
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
      onClose={() => router.push("/")}
      onInfoPress={() => alert("Info about this step")}
      onSaveAndNext={handleSubmit(onSubmit)}
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
