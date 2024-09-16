import { StyleSheet } from "react-native";


export const myStyle = StyleSheet.create({
    bg : {
        height: "100%"
    },
    top_bar : {
        height : 100,
        width : "100%",
        justifyContent: 'center', // จัดแนวแนวนอน (แนวกลาง)
        alignItems: 'center',     // จัดแนวแนวตั้ง (แนวกลาง)
        backgroundColor : "#FFF",
        shadowColor: '#000',  // สีเงา (ใช้ค่า rgba เทียบเท่าจาก CSS)
        shadowOffset: {
            width: 0,           // เทียบกับค่า 0px
            height: 4,          // เทียบกับค่า 4px
        },
            shadowOpacity: 0.25,   // ความโปร่งใสของเงา (จาก rgba(0, 0, 0, 0.25))
            shadowRadius: 4,       // รัศมีเงา (เทียบกับค่า 4px)
            elevation: 4, 

    },
    top_bar_content : {
        height : "100%",
        width : "100%",
        flexDirection : 'row', // ใช้การจัดเรียงเป็นแถว
        justifyContent : 'space-between', // จัดแนวข้อความในแนวนอน
        alignItems : 'center',     // จัดแนวข้อความในแนวตั้ง
        paddingLeft : 40,
        paddingRight : 40
    }

})