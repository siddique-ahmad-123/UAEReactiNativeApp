import CustomButton from "@/components/CustomButton";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import CustomUpload from "@/components/CustomUpload";
import FormLayout from "@/components/Form/FormLayout";
import MethodSelector from "@/components/MethodSelector";
import SectionHeader from "@/components/SectionHeader";
import SegmentedControl from "@/components/SegmentControl";
import {
  fontSize,
  radius,
  spacing,
  spacingExtra,
  spacingVertical,
} from "@/constants/Metrics";
import {
  useGetCustomerDataMutation,
  useGetEmiratesDropDownValuesQuery,
  useOnSendingEmailMutation,
  useSalaryCertificateMutation,
  useTradeLicenseMutation,
} from "@/redux/api/creditCardAPI";
import { fieldNames } from "@/schemas/creditCard/allFieldNames";
import { placeHoldersNames } from "@/schemas/creditCard/allFieldsPlaceholder";
import { useApplicationStore } from "@/store/applicationStore";
import calculateAge from "@/utils/calculateAge";
import {
  getUaeFtsCompletedMail,
  getUaeFtsInitiatedMail,
} from "@/utils/sendEmailUae";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "styled-components/native";

export default function BorrowerIncomeScreen() {
  const [isloading, setIsLoading] = useState(false);
  const [isloading2, setIsLoading2] = useState(false);
  const [isloading3, setIsLoading3] = useState(false);
  const [isloading4, setIsLoading4] = useState(false);
  const [isloading5, setIsLoading5] = useState(false);
  const [isloading6, setIsLoading6] = useState(false);
  // const [salaryFetched, setSalaryFetched] = useState(false);
  const [ftsRequestSent, setFtsRequestSent] = useState(false);
  // const [selfIncomeFetched, setSelfIncomeFetched] = useState(false);
  const [tradeLicenseOCR] = useTradeLicenseMutation();
  const [salaryCertificateOCR] = useSalaryCertificateMutation();
  const [getCustomerData] = useGetCustomerDataMutation();
  const [sendEmail] = useOnSendingEmailMutation();
  const { t } = useTranslation();
  const { updateField, nextStep, prevStep, formData } = useApplicationStore();
  const { control, handleSubmit, setValue, watch, getValues } = useForm({
    // resolver: zodResolver(incomeDetailSchema.partial()),
    defaultValues: formData,
  });
  const borrowerIncomeType = watch(fieldNames.borrowerIncomeType) ?? "Salaried";
  const empDetailFetchMethod =
    watch(fieldNames.borrowerEmpDetailFetchMethod) ?? "AECB";
  const businessDetailFetchMethod =
    watch(fieldNames.borrowerBusinessDetailFetchMethod) ??
    "Upload Trade License";
  const salaryIncomeDetailFetchMethod =
    watch(fieldNames.borrowerSalaryIncomeDetailFetchMethod) ??
    "Salary Transfer";
  const selfIncomeDetailFetchMethod =
    watch(fieldNames.borrowerSelfIncomeDetailFetchMethod) ?? "Fetch From Bank";
  const salaryIncomeUaeFtsGetStatusValue =
    watch(fieldNames.borrowerFtsStatus) ?? "";
  const ftsStatus = watch(fieldNames.borrowerFtsStatus);

  const onSubmit = (values: any) => {
    console.log("Income Details Submitted:", values);
    Object.entries(values).forEach(([k, v]) => updateField(k, v));
    nextStep();
  };

  useEffect(() => {
    const currentDate = new Date();

    const formattedCurrentDate = currentDate.toJSON().slice(0, 10);

    const sixMonthsBefore = new Date(currentDate);
    sixMonthsBefore.setMonth(sixMonthsBefore.getMonth() - 6);

    const formattedSixMonthBefore = sixMonthsBefore.toISOString().slice(0, 10);

    setValue(fieldNames.borrowerStartDateFts, formattedSixMonthBefore);
    setValue(fieldNames.borrowerEndDateFts, formattedCurrentDate);
  }, []);

  const onChangeBorrowerIncomeType = (value: string) => {
    setValue(fieldNames.borrowerIncomeType, value);
    setValue(fieldNames.borrowerFtsStatus, "");
  };

  const onChangeEmpDetailsFetchMethod = (id: string) => {
    setValue(fieldNames.borrowerEmpDetailFetchMethod, id);
    // setValue(fieldNames.borrowerEmployerName, "");
    // setValue(fieldNames.borrowerEmployedFrom, "");
    // setValue(fieldNames.borrowerCurrentExp, "");
    // setValue(fieldNames.borrowerTotalExp, "");
    // setValue(fieldNames.borrowerEmirates, "");
  };

  const onChangeSalaryIncomeDetailFetchMethod = (id: string) => {
    setValue(fieldNames.borrowerSalaryIncomeDetailFetchMethod, id);
    // setValue(fieldNames.borrowerMonthlySalaryBankTransfer, "");
    // setValue(fieldNames.borrowerMonthlySalaryAECB, "");
    // setSalaryFetched(false);
  };

  const onChangeBusinessDetailFetchMethod = (id: string) => {
    setValue(fieldNames.borrowerBusinessDetailFetchMethod, id);
    // setValue(fieldNames.borrowerNameOfBusiness, "");
    // setValue(fieldNames.borrowerLegalForm, "");
    // setValue(fieldNames.borrowerEmiratesBusiness, "");
    // setValue(fieldNames.borrowerDateOfEstabilishment, "");
    // setValue(fieldNames.borrowerVintage, "");
    // setValue(fieldNames.borrowerLicenseNo, "");
    // setValue(fieldNames.borrowerNatureOfBusiness, "");
  };

  const onChangeSelfIncomeDetailFetchMethod = (id: string) => {
    setValue(fieldNames.borrowerSelfIncomeDetailFetchMethod, id);
    // setValue(fieldNames.borrowerBankName, "");
    // setValue(fieldNames.borrowerAccountNo, "");
    // setValue(fieldNames.borrowerLast6MonthsADB, "");
    // setValue(fieldNames.borrowerLast6MonthsAvgCredit, "");
  };

  const fetchEmploymentDetails = async () => {
    setIsLoading2(true);
    console.log(empDetailFetchMethod);
    if (empDetailFetchMethod === "AECB") {
      console.log("AECB Case data fetching");
      const customerDataResp = await getCustomerData("501234567").unwrap();

      console.log(customerDataResp);
      if (customerDataResp.status == 200) {
        setValue(
          fieldNames.borrowerEmployerName,
          customerDataResp.data.employerName
        );
        setValue(
          fieldNames.borrowerEmployedFrom,
          customerDataResp.data.employedFrom
        );
        setValue(
          fieldNames.borrowerCurrentExp,
          customerDataResp.data.currentExp
        );
        setValue(fieldNames.borrowerTotalExp, customerDataResp.data.totalExp);
        setValue(fieldNames.borrowerEmirates, customerDataResp.data.emirates);
      }
    }

    //Case for salary certificate (OCR else db data)
    if (empDetailFetchMethod === "Salary Certificate") {
      const salaryCertificateResponse = await salaryCertificateOCR(
        formData[fieldNames.mobileNo]
      ).unwrap();
      if (salaryCertificateResponse.status == 200) {
        setValue("scEmployerName", salaryCertificateResponse.data.companyName);
        let dateOfJoining =
          salaryCertificateResponse.data.dateOfJoining.replace(/\//g, "-");
        let currentExp = Number(calculateAge(dateOfJoining)) * 12;
        setValue("scEmployedFrom", salaryCertificateResponse.data.dateOf);
        setValue("scCurrExp", currentExp);
        setValue("scEmirates", salaryCertificateResponse.data.nationality);
      } else {
        const customerDataResp = await getCustomerData("501234567").unwrap();

        if (customerDataResp.status == 200) {
          setValue("scEmployerName", customerDataResp.data.employerName);
          setValue("scEmployedFrom", customerDataResp.data.employedFrom);
          setValue("scCurrExp", customerDataResp.data.currentExp);
          setValue("scTotalExp", customerDataResp.data.totalExp);
          setValue("scEmirates", customerDataResp.data.emirates);
        }
      }
    }
    setIsLoading2(false);
  };

  const fetchSalariedIncomeDetails = async () => {
    setIsLoading3(true);
    const customerDataResp = await getCustomerData("501234567").unwrap();

    if (salaryIncomeDetailFetchMethod === "Salary Transfer") {
      if (customerDataResp.status == 200) {
        setValue(
          fieldNames.borrowerMonthlySalaryBankTransfer,
          customerDataResp.data.monthlySalaryBankTrans
        );
        setValue(
          fieldNames.borrowerMonthlySalaryAECB,
          customerDataResp.data.monthlySalaryAECB
        );
      }
    } else if (salaryIncomeDetailFetchMethod === "UAE-FTS") {
      if (customerDataResp.status == 200) {
        setValue("ufMonthlyBank", customerDataResp.data.monthlySalaryBankTrans);
        setValue("ufMonthlyAecb", customerDataResp.data.monthlySalaryAECB);
      }
    }

    // setSalaryFetched(true);
    setIsLoading3(false);
  };

  const salaryIncomeUaeFtsGetStatus = async () => {
    setIsLoading5(true);
    setTimeout(async () => {
      if (salaryIncomeUaeFtsGetStatusValue === "") {
        setValue(fieldNames.borrowerFtsStatus, "Initiated");
        const body = {
          subject: getUaeFtsInitiatedMail(formData[fieldNames.borrowerName])
            .subject,
          mailBody: getUaeFtsInitiatedMail(formData[fieldNames.borrowerName])
            .body,
          mailTo: formData[fieldNames.borrowerEmailId],
        };
        const response = await sendEmail(body).unwrap();
      } else if (salaryIncomeUaeFtsGetStatusValue === "Initiated") {
        setValue(fieldNames.borrowerFtsStatus, "Pending");
      } else if (salaryIncomeUaeFtsGetStatusValue === "Pending") {
        setValue(fieldNames.borrowerFtsStatus, "Completed");
        const body = {
          subject: getUaeFtsCompletedMail(formData[fieldNames.borrowerName])
            .subject,
          mailBody: getUaeFtsCompletedMail(formData[fieldNames.borrowerName])
            .body,
          mailTo: formData[fieldNames.borrowerEmailId],
        };
        const response = await sendEmail(body).unwrap();
      }
      setIsLoading5(false);
    }, 2000);
  };

  const handleFetchDetailsBusiness = async () => {
    setIsLoading(true);
    const tradeLicenseResponse = await tradeLicenseOCR(
      formData[fieldNames.mobileNo]
    ).unwrap();
    if (tradeLicenseResponse.status == 200) {
      setValue(
        fieldNames.borrowerNameOfBusiness,
        tradeLicenseResponse.data.nameOfBusiness
      );
      setValue(
        fieldNames.borrowerLegalForm,
        tradeLicenseResponse.data.legalForm
      );
      setValue(
        fieldNames.borrowerDateOfEstabilishment,
        tradeLicenseResponse.data.dateOfestb
      );
      setValue(
        fieldNames.borrowerLicenseNo,
        tradeLicenseResponse.data.licenseNo
      );
    } else {
      const customerDataResp = await getCustomerData("501234567").unwrap();

      if (customerDataResp.status == 200) {
        setValue(
          fieldNames.borrowerNameOfBusiness,
          customerDataResp.data.nameOfBusiness
        );
        setValue(fieldNames.borrowerLegalForm, customerDataResp.data.legalForm);
        setValue(fieldNames.borrowerEmirates, customerDataResp.data.emirates);
        setValue(fieldNames.borrowerVintage, customerDataResp.data.vintage);
        setValue(
          fieldNames.borrowerDateOfEstabilishment,
          customerDataResp.data.dateOfEstb
        );
        setValue(fieldNames.borrowerLicenseNo, customerDataResp.data.licenseNo);
      }
    }
    setIsLoading(false);
  };

  const selfEmpIncomeDetails = async () => {
    console.log(selfIncomeDetailFetchMethod);
    setIsLoading6(true);

    const customerDataResp = await getCustomerData("501234567").unwrap();

    if (selfIncomeDetailFetchMethod === "Fetch From Bank") {
      if (customerDataResp.status == 200) {
        setValue(fieldNames.borrowerBankName, customerDataResp.data.bankName);
        setValue(fieldNames.borrowerAccountNo, customerDataResp.data.accountNo);
        setValue(
          fieldNames.borrowerLast6MonthsADB,
          customerDataResp.data.last6monthsAdb
        );
        setValue(
          fieldNames.borrowerLast6MonthsAvgCredit,
          customerDataResp.data.last6monthsAvg
        );
      }
    } else if (selfIncomeDetailFetchMethod === "Upload Bank Statement") {
      if (customerDataResp.status == 200) {
        setValue("ubsBankName", customerDataResp.data.bankName);
        setValue("ubsAccNo", customerDataResp.data.accountNo);
        setValue("ubsAdb", customerDataResp.data.last6monthsAdb);
        setValue("ubsAvgCredit", customerDataResp.data.last6monthsAvg);
      }
    } else if (selfIncomeDetailFetchMethod === "UAE-FTS") {
      if (customerDataResp.status == 200) {
        setValue("ufBankName", customerDataResp.data.bankName);
        setValue("ufAccNo", customerDataResp.data.accountNo);
        setValue("ufAdb", customerDataResp.data.last6monthsAdb);
        setValue("ufAvgCredit", customerDataResp.data.last6monthsAvg);
      }
    }

    setIsLoading6(false);
    // setSelfIncomeFetched(true);
  };

  const sendRequestUaeFts = () => {
    setIsLoading4(true);
    setTimeout(() => {
      setFtsRequestSent(true);
      setIsLoading4(false);
    }, 2000);
  };
  const employmentMethods = [
    {
      id: "AECB",
      title: "AECB",
      description: "Details will be pulled from Credit Bureau",
      iconName: "card", // Ionicons name
    },
    {
      id: "Salary Certificate",
      title: "Salary Certificate",
      description: "Salary Certificate not older than 1 month to be uploaded",
      iconName: "document-text",
    },
  ];
  const businessMethods = [
    {
      id: "Upload Trade License",
      title: "Upload Trade License",
      description: "Details will be pulled via OCR over Trade License",
      iconName: "business", // Ionicons name
    },
    {
      id: "Manually Enter",
      title: "Manually Enter",
      description: "Manually Entering the Business Details",
      iconName: "create",
    },
  ];
  const salaryIncomeMethods = [
    {
      id: "Salary Transfer",
      title: "Salary Transfer",
      description: "Details will be pulled from Bank & AECB",
      iconName: "swap-horizontal",
    },
    {
      id: "UAE-FTS",
      title: "UAE-FTS",
      description: "Details will be pulled via UAE-FTS & AECB",
      iconName: "swap-vertical",
    },
  ];
  const businessIncomeMethods = [
    {
      id: "Fetch From Bank",
      title: "Fetch From Bank",
      description: "",
      iconName: "swap-horizontal",
    },
    {
      id: "Upload Bank Statement",
      title: "Upload Bank Statement",
      description: "",
      iconName: "document-text",
    },
    {
      id: "UAE-FTS",
      title: "UAE-FTS",
      description: "",
      iconName: "swap-vertical",
    },
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
  const statusOptions = [
    { label: "Initiated", value: "Initiated" },
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
  ];
  const legalFormOptions = [
    { label: "Sole Proprietorship", value: "Sole Proprietorship" },
    {
      label: "Limited Liability Company (LLC)",
      value: "Limited Liability Company (LLC)",
    },
  ];
  const natureOfBusinessOptions = [
    { label: "IT Services", value: "IT Services" },
    { label: "Trading", value: "Trading" },
    { label: "Retail", value: "Retail" },
  ];

  const theme = useTheme();
  const styles = StyleSheet.create({
    messageContainer: {
      flexDirection: theme.flexRow.flexDirection,
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.md,
      marginHorizontal: spacing.xl,
      marginVertical: spacingVertical.md,
      backgroundColor: theme.colors.background,
    },
    messageIconContainer: {
      width: spacingExtra.s35,
      height: spacingExtra.s35,
      borderRadius: radius.xxl,
      backgroundColor: theme.colors.verifyCheck,
      alignItems: "center",
      justifyContent: "center",
    },
    message: {
      fontSize: fontSize.xs,
      textAlign: "center",
      color: theme.colors.textPrimary,
      lineHeight: spacingVertical.md,
    },
  });

  return (
    <FormLayout
      stepNumber={2}
      title={t("incomeDetails")}
      subTitle={t("borrowerDetails")}
      noOfBars={1}
      activeBarIndex={0}
      onBack={() => prevStep()}
      onClose={() => router.push("/(main)/NavScreen")}
      onInfoPress={() => alert("Info about this step")}
      onSaveAndNext={handleSubmit(onSubmit)}
    >
      <SegmentedControl
        label={"Select Income Type"}
        options={["Salaried", "Self Employed"]}
        defaultValue={borrowerIncomeType}
        onChange={
          (value) => onChangeBorrowerIncomeType(value)
          // setValue(fieldNames.borrowerIncomeType, value)
        }
      />
      {borrowerIncomeType === "Salaried" ? (
        <>
          <SectionHeader
            sectionName="Employment  Information"
            style={{ marginTop: spacingVertical.md }}
          />
          <MethodSelector
            title={"Select Method to Fetch Employment Details"}
            options={employmentMethods}
            selectedId={empDetailFetchMethod}
            onSelect={
              (id) => onChangeEmpDetailsFetchMethod(id)
              // setValue(fieldNames.borrowerEmpDetailFetchMethod, id)
            }
          />
          {empDetailFetchMethod === "Salary Certificate" && (
            <CustomUpload
              label="Upload Salary Certificate"
              control={control}
              name="UploadSalaryCertificate"
            />
          )}
          <CustomButton
            title="Fetch Employment Details"
            onPress={fetchEmploymentDetails}
            isloading={isloading2}
          />

          {empDetailFetchMethod === "Salary Certificate" && (
            <>
              <CustomInput
                control={control}
                name="scEmployerName"
                label="Employer Name"
                type="text"
                placeholder={placeHoldersNames.EmployerName}
              />
              <CustomDatePicker
                control={control}
                name="scEmployedFrom"
                label="Employed From"
              />
              <CustomInput
                control={control}
                name="scCurrExp"
                label="Current Experience (Months)"
                placeholder={placeHoldersNames.CurrentExp}
                type="number"
              />
              <CustomInput
                control={control}
                name="scTotalExp"
                label="Total Experience (Months)"
                placeholder={placeHoldersNames.TotalExperience}
                type="number"
              />
              <CustomDropDown
                control={control}
                name="scEmirates"
                label="Emirates"
                data={emiratesOptions}
              />
            </>
          )}
          {empDetailFetchMethod === "AECB" && (
            <>
              <CustomInput
                control={control}
                name={fieldNames.borrowerEmployerName}
                label="Employer Name"
                type="text"
                placeholder={placeHoldersNames.EmployerName}
              />
              <CustomDatePicker
                control={control}
                name={fieldNames.borrowerEmployedFrom}
                label="Employed From"
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerCurrentExp}
                label="Current Experience (Months)"
                placeholder={placeHoldersNames.CurrentExp}
                type="number"
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerTotalExp}
                label="Total Experience (Months)"
                placeholder={placeHoldersNames.TotalExperience}
                type="number"
              />
              <CustomDropDown
                control={control}
                name={fieldNames.borrowerEmirates}
                label="Emirates"
                data={emiratesOptions}
              />
            </>
          )}

          <SectionHeader
            sectionName="Income  Details"
            style={{ marginTop: spacingVertical.md }}
          />
          <MethodSelector
            title={"Select Method to Fetch Income Details"}
            options={salaryIncomeMethods}
            selectedId={salaryIncomeDetailFetchMethod}
            onSelect={
              (id) => onChangeSalaryIncomeDetailFetchMethod(id)
              // setValue(fieldNames.borrowerSalaryIncomeDetailFetchMethod, id)
            }
          />
          {salaryIncomeDetailFetchMethod === "UAE-FTS" && (
            <>
              <CustomInput
                control={control}
                name={fieldNames.borrowerEmiratesId}
                label="Emirates ID"
                placeholder="Enter Emirates ID"
                type="text"
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerIbanNo}
                label="IBAN No"
                type="text"
                placeholder={placeHoldersNames.IBANNO}
              />

              <CustomInput
                control={control}
                name={fieldNames.borrowerBankingCode}
                label="Banking Code"
                placeholder={placeHoldersNames.BankingCode}
                type="text"
              />
              <CustomDatePicker
                control={control}
                name={fieldNames.borrowerStartDateFts}
                label="Start Date"
              />
              <CustomDatePicker
                control={control}
                name={fieldNames.borrowerEndDateFts}
                label="End Date"
              />
              <CustomButton
                title="Send Request"
                onPress={sendRequestUaeFts}
                isloading={isloading4}
              />
              {ftsRequestSent ? (
                <>
                  <View style={styles.messageContainer}>
                    {/* Green Circle with Check */}
                    <View style={styles.messageIconContainer}>
                      <Ionicons name="checkmark" size={28} color="white" />
                    </View>

                    {/* Message */}
                    <Text style={styles.message}>
                      UAE-FTS Request has been successfully placed, we will
                      inform you over email and app notification once we receive
                      your FTS result, please resume journey then
                    </Text>
                  </View>
                  <CustomButton
                    title="Get Status"
                    onPress={salaryIncomeUaeFtsGetStatus}
                    isloading={isloading5}
                  />
                </>
              ) : (
                <></>
              )}

              {ftsStatus === "Initiated" ||
              ftsStatus === "Pending" ||
              ftsStatus === "Completed" ? (
                <CustomDropDown
                  control={control}
                  name={fieldNames.borrowerFtsStatus}
                  label="FTS Status"
                  data={statusOptions}
                />
              ) : (
                <></>
              )}
            </>
          )}

          {salaryIncomeDetailFetchMethod === "Salary Transfer" && (
            <>
              <CustomButton
                title="Fetch Salary Details"
                onPress={fetchSalariedIncomeDetails}
                isloading={isloading3}
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerMonthlySalaryBankTransfer}
                label="Monthly Salary (Bank Transfer)"
                placeholder={placeHoldersNames.MonthylySalary}
                type="number"
                formatWithCommas={true}
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerMonthlySalaryAECB}
                label="Monthly Salary (AECB)"
                placeholder="Monthly Salary AECB"
                type="number"
                formatWithCommas={true}
              />
            </>
          )}

          {salaryIncomeDetailFetchMethod === "UAE-FTS" &&
            ftsStatus === "Completed" && (
              <>
                <CustomButton
                  title="Fetch Salary Details"
                  onPress={fetchSalariedIncomeDetails}
                  isloading={isloading3}
                />
                <CustomInput
                  control={control}
                  name="ufMonthlyBank"
                  label="Monthly Salary (Bank Transfer)"
                  placeholder={placeHoldersNames.MonthylySalary}
                  type="number"
                  formatWithCommas={true}
                />
                <CustomInput
                  control={control}
                  name="ufMonthlyAecb"
                  label="Monthly Salary (AECB)"
                  placeholder="Monthly Salary AECB"
                  type="number"
                  formatWithCommas={true}
                />
              </>
            )}

          {/* {salaryIncomeDetailFetchMethod === "Salary Transfer" ||
          (salaryIncomeDetailFetchMethod === "UAE-FTS" &&
            ftsStatus === "Completed") ? (
            <>
              <CustomButton
                title="Fetch Salary Details"
                onPress={fetchSalariedIncomeDetails}
                isloading={isloading3}
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerMonthlySalaryBankTransfer}
                label="Monthly Salary (Bank Transfer)"
                placeholder={placeHoldersNames.MonthylySalary}
                type="number"
                formatWithCommas={true}
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerMonthlySalaryAECB}
                label="Monthly Salary (AECB)"
                placeholder="Monthly Salary AECB"
                type="number"
                formatWithCommas={true}
              />
            </>
          ) : (
            <></>
          )} */}
        </>
      ) : (
        <>
          <SectionHeader
            sectionName="Business  Information"
            style={{ marginTop: spacingVertical.md }}
          />
          <MethodSelector
            title={"Select Method to Fetch Business Details"}
            options={businessMethods}
            selectedId={businessDetailFetchMethod}
            onSelect={
              (id) => onChangeBusinessDetailFetchMethod(id)
              // setValue(fieldNames.borrowerBusinessDetailFetchMethod, id)
            }
          />
          {businessDetailFetchMethod === "Upload Trade License" && (
            <>
              <CustomUpload
                label="Upload Trade License"
                control={control}
                name="UploadTradeLicense"
              />
              <CustomButton
                title="Fetch Business Details"
                onPress={handleFetchDetailsBusiness}
                isloading={isloading}
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerNameOfBusiness}
                label="Name of Business"
                type="text"
                placeholder="Enter name of business"
              />
              <CustomDropDown
                control={control}
                name={fieldNames.borrowerLegalForm}
                label="Legal Form"
                data={legalFormOptions}
              />
              <CustomDropDown
                control={control}
                name={fieldNames.borrowerEmiratesBusiness}
                label="Emirates"
                data={emiratesOptions}
              />
              <CustomDatePicker
                control={control}
                name={fieldNames.borrowerDateOfEstabilishment}
                label="Date of Establishment"
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerVintage}
                label="Vintage (Months)"
                placeholder="Enter vintage"
                type="number"
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerLicenseNo}
                label="License No"
                type="text"
                placeholder="Enter your business license no"
              />
              <CustomDropDown
                control={control}
                name={fieldNames.borrowerNatureOfBusiness}
                label="Nature of Business"
                data={natureOfBusinessOptions}
              />
            </>
          )}

          {businessDetailFetchMethod === "Manually Enter" && (
            <>
              <CustomInput
                control={control}
                name="mNameOfBusiness"
                label="Name of Business"
                type="text"
                placeholder="Enter name of business"
              />
              <CustomDropDown
                control={control}
                name="mLegalForm"
                label="Legal Form"
                data={legalFormOptions}
              />
              <CustomDropDown
                control={control}
                name="mEmirates"
                label="Emirates"
                data={emiratesOptions}
              />
              <CustomDatePicker
                control={control}
                name="mDateOfEstb"
                label="Date of Establishment"
              />
              <CustomInput
                control={control}
                name="mBusinessVintage"
                label="Vintage (Months)"
                placeholder="Enter vintage"
                type="number"
              />
              <CustomInput
                control={control}
                name="mLicenseNo"
                label="License No"
                type="text"
                placeholder="Enter your business license no"
              />
              <CustomDropDown
                control={control}
                name="mNatureOfBusiness"
                label="Nature of Business"
                data={natureOfBusinessOptions}
              />
            </>
          )}

          {/* <CustomInput
            control={control}
            name={fieldNames.borrowerNameOfBusiness}
            label="Name of Business"
            type="text"
            placeholder="Enter name of business"
          />
          <CustomDropDown
            control={control}
            name={fieldNames.borrowerLegalForm}
            label="Legal Form"
            data={legalFormOptions}
          />
          <CustomDropDown
            control={control}
            name={fieldNames.borrowerEmiratesBusiness}
            label="Emirates"
            data={emiratesOptions}
          />
          <CustomDatePicker
            control={control}
            name={fieldNames.borrowerDateOfEstabilishment}
            label="Date of Establishment"
          />
          <CustomInput
            control={control}
            name={fieldNames.borrowerVintage}
            label="Vintage (Months)"
            placeholder="Enter vintage"
            type="number"
          />
          <CustomInput
            control={control}
            name={fieldNames.borrowerLicenseNo}
            label="License No"
            type="text"
            placeholder="Enter your business license no"
          />
          <CustomDropDown
            control={control}
            name={fieldNames.borrowerNatureOfBusiness}
            label="Nature of Business"
            data={natureOfBusinessOptions}
          /> */}
          <SectionHeader
            sectionName="Income  Details"
            style={{ marginTop: spacingVertical.md }}
          />
          <MethodSelector
            title={"Select Method to Fetch Income Details"}
            options={businessIncomeMethods}
            selectedId={selfIncomeDetailFetchMethod}
            onSelect={
              (id) => onChangeSelfIncomeDetailFetchMethod(id)
              // setValue(fieldNames.borrowerSelfIncomeDetailFetchMethod, id)
            }
          />
          {selfIncomeDetailFetchMethod === "Upload Bank Statement" && (
            <CustomUpload
              label="Upload Bank Statement"
              control={control}
              name="UploadBankStatement"
            />
          )}
          {selfIncomeDetailFetchMethod === "UAE-FTS" && (
            <>
              <CustomInput
                control={control}
                name={fieldNames.borrowerEmiratesId}
                label="Emirates ID"
                placeholder={placeHoldersNames.EmiratesID}
                type="text"
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerIbanNo}
                label="IBAN No"
                type="text"
                placeholder={placeHoldersNames.IBANNO}
              />

              <CustomInput
                control={control}
                name={fieldNames.borrowerBankingCode}
                label="Banking Code"
                placeholder={placeHoldersNames.BankingCode}
                type="text"
              />
              <CustomDatePicker
                control={control}
                name={fieldNames.borrowerStartDateFts}
                label="Start Date"
              />
              <CustomDatePicker
                control={control}
                name={fieldNames.borrowerEndDateFts}
                label="End Date"
              />
              <CustomButton
                title="Send Request"
                onPress={sendRequestUaeFts}
                isloading={isloading4}
              />
              {ftsRequestSent ? (
                <>
                  <View style={styles.messageContainer}>
                    {/* Green Circle with Check */}
                    <View style={styles.messageIconContainer}>
                      <Ionicons name="checkmark" size={28} color="white" />
                    </View>

                    {/* Message */}
                    <Text style={styles.message}>
                      UAE-FTS Request has been successfully placed, we will
                      inform you over email and app notification once we receive
                      your FTS result, please resume journey then
                    </Text>
                  </View>
                  <CustomButton
                    title="Get Status"
                    onPress={salaryIncomeUaeFtsGetStatus}
                    isloading={isloading5}
                  />
                </>
              ) : (
                <></>
              )}

              {ftsStatus === "Initiated" ||
              ftsStatus === "Pending" ||
              ftsStatus === "Completed" ? (
                <CustomDropDown
                  control={control}
                  name={fieldNames.borrowerFtsStatus}
                  label="FTS Status"
                  data={statusOptions}
                />
              ) : (
                <></>
              )}
            </>
          )}

          {selfIncomeDetailFetchMethod === "Fetch From Bank" && (
            <>
              <CustomButton
                title="Fetch Income Details"
                onPress={selfEmpIncomeDetails}
                isloading={isloading6}
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerBankName}
                label="Bank Name"
                placeholder={placeHoldersNames.BankName}
                type="text"
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerAccountNo}
                label="Account No"
                placeholder={placeHoldersNames.AccountNumber}
                type="number"
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerLast6MonthsADB}
                label="Last 6 Months ADB"
                placeholder="Enter last 6 months ADB"
                type="number"
                formatWithCommas={true}
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerLast6MonthsAvgCredit}
                label="Last 6 Months Avg Credit"
                placeholder="Enter last 6 months avg credit"
                type="number"
                formatWithCommas={true}
              />
            </>
          )}
          {selfIncomeDetailFetchMethod === "Upload Bank Statement" && (
            <>
              <CustomButton
                title="Fetch Income Details"
                onPress={selfEmpIncomeDetails}
                isloading={isloading6}
              />
              <CustomInput
                control={control}
                name="ubsBankName"
                label="Bank Name"
                placeholder={placeHoldersNames.BankName}
                type="text"
              />
              <CustomInput
                control={control}
                name="ubsAccNo"
                label="Account No"
                placeholder={placeHoldersNames.AccountNumber}
                type="number"
              />
              <CustomInput
                control={control}
                name="ubsAdb"
                label="Last 6 Months ADB"
                placeholder="Enter last 6 months ADB"
                type="number"
                formatWithCommas={true}
              />
              <CustomInput
                control={control}
                name="ubsAvgCredit"
                label="Last 6 Months Avg Credit"
                placeholder="Enter last 6 months avg credit"
                type="number"
                formatWithCommas={true}
              />
            </>
          )}
          {selfIncomeDetailFetchMethod === "UAE-FTS" &&
            ftsStatus === "Completed" && (
              <>
                <CustomButton
                  title="Fetch Income Details"
                  onPress={selfEmpIncomeDetails}
                  isloading={isloading6}
                />
                <CustomInput
                  control={control}
                  name="ufBankName"
                  label="Bank Name"
                  placeholder={placeHoldersNames.BankName}
                  type="text"
                />
                <CustomInput
                  control={control}
                  name="ufAccNo"
                  label="Account No"
                  placeholder={placeHoldersNames.AccountNumber}
                  type="number"
                />
                <CustomInput
                  control={control}
                  name="ufAdb"
                  label="Last 6 Months ADB"
                  placeholder="Enter last 6 months ADB"
                  type="number"
                  formatWithCommas={true}
                />
                <CustomInput
                  control={control}
                  name="ufAvgCredit"
                  label="Last 6 Months Avg Credit"
                  placeholder="Enter last 6 months avg credit"
                  type="number"
                  formatWithCommas={true}
                />
              </>
            )}

          {/* {selfIncomeDetailFetchMethod === "Fetch From Bank" ||
          selfIncomeDetailFetchMethod === "Upload Bank Statement" ||
          (selfIncomeDetailFetchMethod === "UAE-FTS" &&
            ftsStatus === "Completed") ? (
            <>
              <CustomButton
                title="Fetch Income Details"
                onPress={selfEmpIncomeDetails}
                isloading={isloading6}
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerBankName}
                label="Bank Name"
                placeholder={placeHoldersNames.BankName}
                type="text"
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerAccountNo}
                label="Account No"
                placeholder={placeHoldersNames.AccountNumber}
                type="number"
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerLast6MonthsADB}
                label="Last 6 Months ADB"
                placeholder="Enter last 6 months ADB"
                type="number"
                formatWithCommas={true}
              />
              <CustomInput
                control={control}
                name={fieldNames.borrowerLast6MonthsAvgCredit}
                label="Last 6 Months Avg Credit"
                placeholder="Enter last 6 months avg credit"
                type="number"
                formatWithCommas={true}
              />
            </>
          ) : (
            <></>
          )} */}
        </>
      )}
    </FormLayout>
  );
}
