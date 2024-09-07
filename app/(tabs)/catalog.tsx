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
          <TouchableOpacity style={styles.header_back_btn}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/images/moreLeft.png")}
            />
          </TouchableOpacity>
          <Image source={require("../../assets/images/blackLogotip.png")} />
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
