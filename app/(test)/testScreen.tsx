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
    <View>
      {/* <SectionHeader sectionName="New Section"></SectionHeader> */}

      {/* <DocumentDownload documentName="Pan Card"></DocumentDownload> */}

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <ServiceTile title="Requests" iconName="document-text-outline" />
        <ServiceTile title="Agreements" iconName="document-attach-outline" />
        <ServiceTile title="Applications" iconName="create-outline" />
      </View>

      {/* <CustomInput label="Name"></CustomInput>
      <CustomInput label="Password" type="password"></CustomInput> */}

      {/* <CustomDatePicker label="DOB" variant="full"></CustomDatePicker> */}

      {/* <CustomDropDown
        label="Select Country"
        placeholder="Choose a country"
        data={countryOptions}
        type="singleSelect"
        variant="full"
      /> */}

      <SegmentedControl
        label="Select Income Type"
        options={["Salaried", "Self Employed"]}
        onChange={(value) => console.log("Selected:", value)}
      />
    </View>
  );
};

export default testScreen;

const styles = StyleSheet.create({});
