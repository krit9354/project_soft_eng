import { StyleSheet } from "react-native";

export const myStyle = StyleSheet.create({
    bottom_bar : {
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
    add : {
        borderRadius : "50%",
        alignItems : "center",
        justifyContent : "center",
        bottom : 20,
        //backgroundColor : "#CDFADB",
        width : 95,
        height : 95,
        shadowColor: '#000', 
        shadowOffset: {
            width: 0,
            height: -4,
        },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 4, 
    }

})