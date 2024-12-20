import { StyleSheet } from "react-native";

export const myStyle = StyleSheet.create({
  bg: {
    height: "100%",
    position: "relative",
  },
  container: {
    height: "100%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  bigtext: {
    fontSize: 30,
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "#DDDDDD",
    
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "#DDDDDD",
    flex: 0.3,
  },
  picker: {
    height: 50,
    width: "100%",
    flex: 1,
  },
  textArea: {
    height: 100,
    borderRadius: 20,
  },
  imagePlaceholder: {
    height: 250,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 20,
    // flex: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height : "100%",
  },
  image_icon : {
    width: 50,
    height : 50,
  },
  button: {
    backgroundColor: "#38E298",
    padding: 10,
    borderRadius: 99,
    alignItems: "center",
    width : 250,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  main_content_box: {
    marginHorizontal: "auto",
    width: "80%",
    height: "90%",
    overflow: "visible",
    zIndex: 0,
  },
  main_pocket: {
    position: "relative",
    backgroundColor: "white",
    width: "100%",
    height: "90%",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  rowcheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  goallabel: {
    fontSize: 16,
    color: '#333',
  },
  bottom_barkub : {
    width : '100%',
    height: 70, // ความสูงของ bottom bar
    backgroundColor: 'white', // สีพื้นหลัง
    flexDirection : 'row',
    alignItems : "center",
    justifyContent : "space-around",
    shadowColor: '#000', 
    shadowOffset: {
        width: 0,
        height: -4,
    },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4, 
},
 
});
