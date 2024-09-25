import { StyleSheet } from "react-native";

export const myStyle = StyleSheet.create({
    bg : {
        height: "100%",
        position : 'relative',
    },
    bg_white : {
        height : "90%",
        width : "90%",
        backgroundColor : 'white',
        borderRadius : 20,
        margin : "5%",
     
        shadowColor: "#000",
     
        
    },
    containerShow : {
        height : "20%",
        width : "90%",
        backgroundColor : 'red',
        borderRadius : 20,
        margin : "5%",
        justifyContent: 'space-around',
        flexDirection : 'row',
        alignItems : 'center',
    },
    box : {
        width : '45%',
        height: '70%', // ความสูงของ bottom bar
        backgroundColor: 'white', // สีพื้นหลัง
        
        
        borderRadius : 20,
        shadowColor: '#000', 
        shadowOffset: {
            width: 0,
            height: -4,
        },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4, 
    },
    }

)