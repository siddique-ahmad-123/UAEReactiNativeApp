import CustomDatePicker from "@/components/CustomDatePicker";
import CustomDropDown from "@/components/CustomDropDown";
import CustomInput from "@/components/CustomInput";
import CustomUpload from "@/components/CustomUpload";
import LabeledSlider from "@/components/LabeledSlider";
import ServiceTile from "@/components/ServiceTile";
import { StyleSheet, View } from "react-native";

const testScreen = () => {
  const countryOptions = [
    { label: "India", value: "IN" },
    { label: "United States", value: "US" },
    { label: "Germany", value: "DE" },
  ];
  return (
    <View>
      {/* <SectionHeader sectionName="New Section"></SectionHeader> */}

      {/* <DocumentDownload documentName="Pan Card"></DocumentDownload> */}

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <ServiceTile title="Requests" iconName="document-text-outline" />
        <ServiceTile title="Agreements" iconName="document-attach-outline" />
        <ServiceTile title="Applications" iconName="create-outline" />
      </View>

      {/* <CustomInput label="Name"></CustomInput> */}
      <CustomInput label="Name" type="text" />
      <CustomInput label="Name" type="text" variant="half" />
      <CustomInput label="password" type="password" />

      <CustomDatePicker label="DOB" variant="full"></CustomDatePicker>

      <CustomDropDown
        label="Select Country"
        placeholder="Choose a country"
        data={countryOptions}
        type="singleSelect"
        variant="full"
      />

      {/* <SegmentedControl
        label="Select Income Type"
        options={["Salaried", "Self Employed"]}
        onChange={(value) => console.log("Selected:", value)}
      />

      <HeroBanner
        message="Thank you for being associated with us."
        backgroundImage={require("../../assets/images/HeroBanner.png")}
      />

      <ProductCard
        title="Credit Card"
        image={require("../../assets/images/ProductImage.png")}
      /> */}

      <CustomUpload label="Passport" />

      <LabeledSlider
        label="Finance Amount"
        min={10000}
        max={200000}
        step={1000}
        unit="AED"
        defaultValue={50000}
      />
    </View>
  );
};

export default testScreen;

const styles = StyleSheet.create({});
