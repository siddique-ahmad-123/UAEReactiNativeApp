import CustomDatePicker from "@/components/CustomDatePicker";
import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import CustomUpload from "@/components/CustomUpload";
import FormSummaryLayout from "@/components/FormSummary/FormSummaryLayout";
import LabeledSlider from "@/components/LabeledSlider";
import SegmentedControl from "@/components/SegmentControl";
import ServiceTile from "@/components/ServiceTile";
import { StyleSheet, View } from "react-native";

const testScreen = () => {
  const countryOptions = [
    { label: "India", value: "IN" },
    { label: "United States", value: "US" },
    { label: "Germany", value: "DE" },
  ];
  return (
    <FormSummaryLayout onSaveAndBack={()=>""}>
       <SegmentedControl
        label="Select Income Type"
        options={["Salaried", "Self Employed"]}
        onChange={(value) => console.log("Selected:", value)}
      />
    </FormSummaryLayout>
  );
};

export default testScreen;

const styles = StyleSheet.create({});
