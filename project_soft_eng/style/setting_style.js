import { StyleSheet } from "react-native";

export const myStyle = StyleSheet.create({
  bg: {
    height: "100%",
    position: "relative",
  },
  main_content_box: {
    marginVertical: 40,
    marginHorizontal: "auto",
    width: "80%",
    height: "100%",
    overflow: "visible",
    zIndex: 0,
    backgroundColor: "white",
    borderRadius : 20,
    padding : 20
  },
  logout_button: {
    backgroundColor: "red",
    marginHorizontal : "auto",
    alignItems : "center",
    justifyContent : "center",
    width : 100,
    height : 30,
    borderRadius : 20,
  },
  image: {
    height: 50,
    width: 50,
  },
  imagePlaceholder: {
    height: 100,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 20,
    flex: 1,
  },
});
