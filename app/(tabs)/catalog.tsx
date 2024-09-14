import CatalogPage from "@/Redux/reducer/pages/CatalogPage";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { stylesAll } from "./style";

export default function CatalogScreen() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={stylesAll.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.header_back_btn}></TouchableOpacity>
          <Image
            style={stylesAll.logotip}
            source={require("../../assets/images/logotipCenter.png")}
          />
          <View style={styles.header_back_btn}></View>
        </View>
        <CatalogPage />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
  },
  header_back_btn: {
    width: 30,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
  },
});
