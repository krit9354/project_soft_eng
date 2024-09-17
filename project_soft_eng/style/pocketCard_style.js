import { StyleSheet } from "react-native";

export const myStyle = StyleSheet.create({
    card : {
        width : '46%',
        height : 145,
        backgroundColor : 'white',
        alignItems : 'center', 
        marginBottom : 20,
        borderRadius : 30,
    },
    image : {
        height : "50%",
        borderTopEndRadius: 30,
        borderTopStartRadius : 30
    },
    container : {
        width : "100%",
        height : "50%",
        justifyContent : "space-around",
        alignItems : "center",
        padding : 10
    },
    bg_bar : {
        backgroundColor : "#D9D9D9", 
        width : "80%",
        height : 10,
        borderRadius : 20
    }
})