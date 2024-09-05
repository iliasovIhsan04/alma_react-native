import { StyleSheet } from "react-native";

export const stylesAll = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  loading: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  header_nav: {
    backgroundColor: "white",
    paddingBottom: 20,
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
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#DC0200",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button_text: {
    fontSize: 16,
    color: "white",
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
  purchase_history: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  history_image_box: {
    width: 210,
    height: 230,
    marginTop: 56,
    marginBottom: 40,
  },
  image_all: {
    width: "100%",
    height: "100%",
  },
  history_text_one: {
    fontSize: 23,
    fontWeight: "700",
    color: "#191919",
    lineHeight: 26,
    textAlign: "center",
  },
  history_text_two: {
    fontSize: 16,
    fontWeight: "400",
    color: "#191919",
    textAlign: "center",
    lineHeight: 18,
    marginTop: 12,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: 500,
    color: "#191919",
    marginBottom: 5,
  },
});
