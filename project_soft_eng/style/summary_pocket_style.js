import { red } from "@mui/material/colors";
import { StyleSheet } from "react-native";

export const myStyle = StyleSheet.create({
    bg: {
        height: "100%",
        position: 'relative',
    },
    container: {
        height: "100%",
        padding: 20,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        flex: 1,
    },
    main_content_box: {
        marginHorizontal: "auto",
        width: "90%",
        height: "90%",
        overflow: "visible",
        zIndex: 0,
    },
    containerInput: {
        height: "100%",
        alignItems: 'center',

    },
    main_pocket: {
        paddingBottom : 20,
        position: "relative",
        backgroundColor: "white",
        width: "100%",
        height: "90%",
        borderRadius: 20,
        marginVertical: 25,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    containerDate: {
        // backgroundColor: "red",
        width: "85%",
        height: "5%",
        margin: "5%",
        borderRadius: 20,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',

    },
    containerButtonFilter: {
    
        // backgroundColor: "red",
        width: "75%",
        borderRadius: 20,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerShow: {
        // paddingTop: "30%",
        marginTop: "10%",
        // backgroundColor: 'red',
        // height: "20%",
        width: "95%",
        borderRadius: 20,
        margin: "3%",
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
    },
    box: {
        width: '47%',
        // height: '70%', // ความสูงของ bottom bar
        backgroundColor: "#DDDDDD", // สีพื้นหลัง
        borderRadius: 20,
        padding: '5%',
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 4, 
    },
    pickerContainer: {
        width: "85%",
        height: "5%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        backgroundColor: "#DDDDDD",
        justifyContent: "center",  // จัดให้อยู่ตรงกลางในแนวตั้ง
        alignItems: "center",  // จัดให้อยู่ตรงกลางในแนวนอน

    },
    picker: {
        height: 40,
        width: "100%",
        borderRadius: 20,
    },
    //   inputDate : {
    //     width : "45%",
    //     height : "80%",
    //     backgroundColor : "#DDDDDD",
    //     borderRadius : 20,
    //     fontSize : 12,
    //     textAlign: 'center',  // จัดข้อความตรงกลางในแนวนอน
    //   },
    inputDate: {
        width: "45%",           // กำหนดความกว้างเป็น 45%
        height: "100%",          // กำหนดความสูงเป็น 80%
        backgroundColor: "#DDDDDD",
        borderRadius: 20,
        justifyContent: 'center',  // จัดเนื้อหาตรงกลางในแนวตั้ง
        alignItems: 'center',      // จัดเนื้อหาตรงกลางในแนวนอน
    },
    textDash: {
        fontSize: 20,
        fontWeight: 'bold'          // ขนาดใหญ่ของเครื่องหมาย -
    },
    textDate: {
        fontSize: 13,
        textAlign: 'center',       // จัดข้อความตรงกลางในแนวนอน
    },
    button: {
        
        backgroundColor: "#38E298",
        padding: 10,
        borderRadius: 99,
        alignItems: "center",
        width: '35%',
        height: '100%',
    },
    buttonText: {
        color: "black",
        fontSize: 15,
        fontWeight: "bold",
    },
}

)