import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import { Alert } from "react-native";
type Props={
    pdfUrl: any;
    name:string;
}
const downloadPDF = async ({pdfUrl,name}:Props) => {
    try {
      const path = `${RNFS.DocumentDirectoryPath}/${name}.pdf`;
      await RNFS.downloadFile({
        fromUrl: pdfUrl,
        toFile: path,
      }).promise;
      console.log("✅ File downloaded to:", path);
      // Open with external viewer
      await FileViewer.open(path);
    } catch (error) {
      console.error("❌ Download/Open error:", error);
      Alert.alert("Error", "Failed to download/open PDF");
    }
  };
  export default downloadPDF;