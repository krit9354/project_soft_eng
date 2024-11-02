import { StyleSheet } from "react-native";

export const myStyle = StyleSheet.create({
  bg: {
    height: "100%",
    position: "relative",
    justifyContent : "space-between",
  },
  main_content_box: {
    marginVertical: 40,
    marginHorizontal: "auto",
    width: "80%",
    height: "80%",
    zIndex: 0,
    backgroundColor: "white",
    borderRadius : 20,
    padding : 20,
  },
  logout_button: {
    backgroundColor: "red",
    marginHorizontal : "auto",
    alignItems : "center",
    justifyContent : "center",
    width : 100,
    height : 30,
    borderRadius : 20,
    marginBottom : 10,
  },
  save_button: {
    backgroundColor: "#38E298",
    marginHorizontal : "auto",
    alignItems : "center",
    justifyContent : "center",
    width : 100,
    height : 30,
    borderRadius : 20,
    marginBottom : 20,
  },
  image: {
    width: "100%",
    height : "100%",
    borderRadius : 200,
  },
  image_icon : {
    width: 50,
    height : 50,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 100,
    marginHorizontal : "auto"
  },
  bigtext: {
    fontSize: 30,
    marginBottom: 8,
    fontWeight: "bold",
    marginBottom : 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "#DDDDDD",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
});
