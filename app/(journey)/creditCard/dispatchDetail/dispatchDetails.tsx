import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import FormLayout from "@/components/Form/FormLayout";
import SegmentedControl from "@/components/SegmentControl";
import {
  fontSize,
  fontWeight,
  spacing,
  spacingVertical,
} from "@/constants/Metrics";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { useApplicationStore } from "@/store/applicationStore";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { t } from "i18next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "styled-components/native";

const DispatchDetails = () => {
  const theme = useTheme();
  const { updateField, nextStep, prevStep, formData } = useApplicationStore();
  const { control, handleSubmit, setValue, watch } = useForm({
    // resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData,
  });

  const onSubmit = (values: any) => {
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    nextStep();
  };

  const dispatchType = watch("dispatchType") ?? "Mailing Address";

  const emiratesOptions = [
    { label: "Dubai", value: "Dubai" },
    { label: "Saudi Arabia", value: "Saudi Arabia" },
  ];
  const countryOptions = [
    { label: "India", value: "IN" },
    { label: "United States", value: "US" },
    { label: "Germany", value: "DE" },
  ];
  const branchOptions = [{ label: "Bur Dubai", value: "Bur Dubai" }];

  const [modifyName, setModifyName] = useState(false);
  const [needSupCard, setNeedSupCard] = useState(false);
  const [mailing, setMailing] = useState(false);
  const [branch, setBranch] = useState(false);

  const styles = StyleSheet.create({
    text: {
      fontSize: fontSize.md,
      color: theme.colors.primaryColor,
      fontWeight: fontWeight.semiBold,
    },
    checkBoxContainer: {
      flexDirection: theme.flexRow.flexDirection,
      gap: spacing.sm,
      alignItems: "center",
    },
    checkBoxText: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.normal,
    },
  });

  return (
    <FormLayout
      stepNumber={5}
      title={t("dispatchDetails")}
      subTitle={t("dispatchDetails")}
      noOfBars={1}
      activeBarIndex={1}
      onBack={() => prevStep()}
      onClose={() => router.push("/")}
      onInfoPress={() => alert("Info about this step")}
      onSaveAndNext={handleSubmit(onSubmit)}
    >
      <View>
        <Text style={styles.text}>Select Name on Card</Text>
      </View>

      <CustomInput
        control={control}
        name={fieldNames.borrowerName}
        label="Name"
        placeholder="Enter your name"
        type="text"
      />

      <View style={styles.checkBoxContainer}>
        <Checkbox
          value={modifyName}
          onValueChange={() => setModifyName(!modifyName)}
          color={modifyName === true ? theme.colors.primaryColor : undefined}
        />
        <Text style={styles.checkBoxText}>Modify Name</Text>
      </View>

      <View style={{ gap: spacing.sm, marginVertical: spacingVertical.semi }}>
        <Text style={styles.text}>Do you need any supplementary card?</Text>
        <View style={styles.checkBoxContainer}>
          <Checkbox
            value={needSupCard === true}
            onValueChange={() => setNeedSupCard(true)}
            color={needSupCard === true ? theme.colors.primaryColor : undefined}
          />
          <Text style={styles.checkBoxText}>Yes</Text>
        </View>
        <View style={styles.checkBoxContainer}>
          <Checkbox
            value={needSupCard === false}
            onValueChange={() => setNeedSupCard(false)}
            color={
              !needSupCard === true ? theme.colors.primaryColor : undefined
            }
          />
          <Text style={styles.checkBoxText}>No</Text>
        </View>
      </View>

      {needSupCard ? (
        <CustomInput
          control={control}
          name={fieldNames.supplementaryCardName}
          label="Supplementary Card Name"
          placeholder="Enter supplementary card name"
          type="text"
        />
      ) : (
        <></>
      )}

      <SegmentedControl
        label={"Select Dispatch Address"}
        options={["Mailing Address", "Branch Collect"]}
        defaultValue={dispatchType}
        onChange={(value) => setValue("dispatchType", value)}
      />

      {dispatchType === "Mailing Address" ? (
        <>
          <View style={styles.checkBoxContainer}>
            <Checkbox
              value={mailing}
              onValueChange={() => setMailing(!mailing)}
              color={mailing === true ? theme.colors.primaryColor : undefined}
            />

            <Text style={styles.checkBoxText}>
              Select Mailing Address to Dispatch Card
            </Text>
          </View>
          {mailing ? (
            <>
              <CustomInput
                control={control}
                name={fieldNames.dispatchAddressLine1}
                label="Address Line 1"
                placeholder="Enter your address"
                type="text"
              />
              <CustomInput
                control={control}
                name={fieldNames.dispatchAddressLine2}
                label="Address Line 2"
                placeholder="Enter your address"
                type="text"
              />

              <CustomDropDown
                name={fieldNames.dispatchEmirates}
                label={"Emirates"}
                data={emiratesOptions}
                control={control}
              />
              <CustomDropDown
                name={fieldNames.dispatchCountry}
                label={"Country"}
                data={countryOptions}
                control={control}
              />
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <View style={styles.checkBoxContainer}>
            <Checkbox
              value={branch}
              onValueChange={() => setBranch(!branch)}
              color={branch === true ? theme.colors.primaryColor : undefined}
            />
            <Text style={styles.checkBoxText}>
              Select below Branch to Dispatch Card
            </Text>
          </View>

          {branch ? (
            <>
              <CustomDropDown
                name={fieldNames.dispatchEmirates}
                label={"Emirates"}
                data={emiratesOptions}
                control={control}
              />
              <CustomDropDown
                name={fieldNames.dispatchBranchName}
                label={"Branch Name"}
                data={branchOptions}
                control={control}
              />

              <View>
                <Text style={{ textAlign: "center" }}>
                  Collection Timings - 9 AM to 4 PM (Monday to Friday)
                </Text>
              </View>
              <View>
                <Text style={{ textAlign: "center" }}>
                  Card will be re-dispatched to Head Office if not collected
                  within 30 days
                </Text>
              </View>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </FormLayout>
  );
};

export default DispatchDetails;
