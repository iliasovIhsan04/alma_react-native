import { StyleSheet } from "react-native";

export const stylesAll = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  footer_absolute: {
    width: 60,
    height: 60,
    backgroundColor: "#DC0200",
    borderRadius: 50,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  header_name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#191919",
  },
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
  background_block: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});
