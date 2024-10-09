import { StyleSheet } from "react-native";

export const myStyle = StyleSheet.create({
    card : {
        maxWidth : 145,
        minHeight : 30 ,
        flex : 1,
        backgroundColor : 'white',
        alignItems : 'center', 
        justifyContent: "center",
        marginBottom : 20,
        borderRadius : 15,
        shadowOffset: {},
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4, 
    },
    mincard : {
        maxWidth : 145,
        minHeight : 40 ,
        flex : 1,
        backgroundColor : 'white',
        alignItems : 'center', 
        justifyContent: "center",
        marginBottom : 20,
        marginLeft :166.5,
        borderRadius : 15,
        shadowOffset: {},
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4, 
    },
    image : {
        height :100,
        width : 100,
        borderRadius : 10,
        margin:10,
    },
    container : {
        justifyContent : "space-around",
        alignItems : "center",
        alignSelf : 'flex-start',
        paddingLeft :20,
    },
    bg_bar : {
        backgroundColor : "#D9D9D9", 
        height : 10,
        borderRadius : 20
    },
   
})