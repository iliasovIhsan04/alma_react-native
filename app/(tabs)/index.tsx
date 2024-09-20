import Main from "@/components/Main/Main";
import { StyleSheet, View, Text } from "react-native";
import { stylesAll } from "../../style";

export default function HomeScreen() {
  return (
    <View style={stylesAll.background_block}>
      <View style={styles.container}>
        <Main />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
