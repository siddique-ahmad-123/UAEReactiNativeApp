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
import {
  useGetEmiratesBranchDropDownValuesQuery,
  useGetEmiratesDropDownValuesQuery,
} from "@/redux/api/creditCardAPI";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { placeHoldersNames } from "@/schemas/creditCard/allFieldsPlaceholder";
import { useApplicationStore } from "@/store/applicationStore";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
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

  const dispatchEmirates = watch(fieldNames.dispatchEmirates) ?? "Dubai";

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
    { label: "United Arab Emirates", value: "United Arab Emirates" },
    { label: "India", value: "IN" },
    { label: "United States", value: "US" },
    { label: "Germany", value: "DE" },
  ];

  const { data: emiratesBranch } = useGetEmiratesBranchDropDownValuesQuery(
    watch(fieldNames.dispatchEmirates),
    { skip: !watch(fieldNames.dispatchEmirates) }
  );

  // const getBranchOptions = () => {
  //   const { data: emiratesBranch } = useGetEmiratesBranchDropDownValuesQuery(
  //     formData[fieldNames.dispatchBranchName],
  //     { skip: !formData[fieldNames.dispatchBranchName] }
  //   );
  // };

  const emiratesBranches = emiratesBranch?.data ?? [
    {
      label: "Ajman Corniche",
      value: "Ajman Corniche",
    },
    {
      label: "Ajman Free Zone",
      value: "Ajman Free Zone",
    },
  ];

  const [modifyName, setModifyName] = useState(false);
  const [needSupCard, setNeedSupCard] = useState(false);
  const [mailing, setMailing] = useState(false);
  const [branch, setBranch] = useState(false);

  useEffect(() => {
    if (mailing) {
      setValue(
        "mailingAddressLine1",
        formData[fieldNames.borrowerAddressLine1]
      );
      setValue(
        "mailingAddressLine2",
        formData[fieldNames.borrowerAddressLine2]
      );
      setValue("mailingEmirates", formData[fieldNames.borrowerEmirates]);
      setValue("mailingCountry", formData[fieldNames.borrowerCountry]);
    } else {
      setValue("mailingAddressLine1", "");
      setValue("mailingAddressLine2", "");
      setValue("mailingEmirates", "");
      setValue("mailingCountry", "");
    }
  }, [mailing]);

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
      onClose={() => router.push("/(main)/NavScreen")}
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
        placeholder={placeHoldersNames.Name}
        type="text"
        editable={modifyName}
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
          placeholder={placeHoldersNames.SupplementaryCard}
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
          {/* {mailing ? (
            <> */}
          <CustomInput
            control={control}
            name="mailingAddressLine1"
            label="Address Line 1"
            placeholder={placeHoldersNames.Address}
            type="text"
          />
          <CustomInput
            control={control}
            name="mailingAddressLine2"
            label="Address Line 2"
            placeholder={placeHoldersNames.Address}
            type="text"
          />

          <CustomDropDown
            name="mailingEmirates"
            label="Emirates"
            data={emiratesOptions}
            control={control}
          />
          <CustomDropDown
            name="mailingCountry"
            label="Country"
            data={countryOptions}
            control={control}
          />
          {/* </>
          ) : (
            <></>
          )} */}
        </>
      ) : (
        <>
          {/* <View style={styles.checkBoxContainer}>
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
            <> */}
          <CustomDropDown
            name={fieldNames.dispatchEmirates}
            label={"Emirates"}
            data={emiratesOptions}
            control={control}
          />
          <CustomDropDown
            name={fieldNames.dispatchBranchName}
            label={"Branch Name"}
            data={emiratesBranches}
            control={control}
          />

          <View>
            <Text style={{ textAlign: "center" }}>
              Collection Timings - 9 AM to 4 PM (Monday to Friday)
            </Text>
          </View>
          <View>
            <Text style={{ textAlign: "center" }}>
              Card will be re-dispatched to Head Office if not collected within
              30 days
            </Text>
          </View>
          {/* </>
          ) : (
            <></>
          )} */}
        </>
      )}
    </FormLayout>
  );
};
export default DispatchDetails;
