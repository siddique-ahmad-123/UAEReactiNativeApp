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
    { label: "United States", value: "US" },
    { label: "Germany", value: "DE" },
  ];

  const { data: emiratesBranch } = useGetEmiratesBranchDropDownValuesQuery(
    formData[fieldNames.dispatchBranchName],
    { skip: !formData[fieldNames.dispatchBranchName] }
  );

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
        <Text style={styles.text}>{t("selectNameOnCard")}</Text>
      </View>

      <CustomInput
        control={control}
        name={fieldNames.borrowerName}
        label={t("name")}
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
        <Text style={styles.checkBoxText}>{t("selectNameOnCard")}</Text>
      </View>

      <View style={{ gap: spacing.sm, marginVertical: spacingVertical.semi }}>
        <Text style={styles.text}>{t("needSupplementaryCard")}</Text>
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
          label={t("supplementaryCardName")}
          placeholder={placeHoldersNames.SupplementaryCard}
          type="text"
        />
      ) : (
        <></>
      )}

      <SegmentedControl
        label={t("selectDispatchAddress")}
        options={[t("mailingAddress"), t("branchCollect")]}
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
              {t("selectMailingAddresDispatch")}
            </Text>
          </View>
          {mailing ? (
            <>
              <CustomInput
                control={control}
                name={fieldNames.dispatchAddressLine1}
                label={t("addressLine1")}
                placeholder={placeHoldersNames.Address}
                type="text"
              />
              <CustomInput
                control={control}
                name={fieldNames.dispatchAddressLine2}
                label={t("addressLine2")}
                placeholder={placeHoldersNames.Address}
                type="text"
              />

              <CustomDropDown
                name={fieldNames.dispatchEmirates}
                label={t("emirates")}
                data={emiratesOptions}
                control={control}
              />
              <CustomDropDown
                name={fieldNames.dispatchCountry}
                label={t("country")}
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
              {t("selectBelowBranchDispatch")}
            </Text>
          </View>

          {branch ? (
            <>
              <CustomDropDown
                name={fieldNames.dispatchEmirates}
                label={t("emirates")}
                data={emiratesOptions}
                control={control}
              />
              <CustomDropDown
                name={fieldNames.dispatchBranchName}
                label={t("branchName")}
                data={emiratesBranches}
                control={control}
              />

              <View>
                <Text style={{ textAlign: "center" }}>
                  {t("collectionTimings")}
                </Text>
              </View>
              <View>
                <Text style={{ textAlign: "center" }}>
                  {t("cardWillBeReDispatched")}
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
