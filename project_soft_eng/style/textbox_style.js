import { StyleSheet } from "react-native";

export const myStyle = StyleSheet.create({
    card : {
        maxWidth : 145,
        minHeight : 30 ,
        flex : 1,
        backgroundColor : 'white',
        alignItems : 'center', 
        justifyContent: "center",
        textAlignVertical : 'center', 
        textAlign:"center",
        marginTop : 10,
        marginBottom:10,
        borderTopRightRadius: 15,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
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
        
        marginTop : 10,
        marginBottom:10,
        marginLeft :"auto",
        borderTopLeftRadius : 15,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
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
        justifyContent: "center",
        alignItems : 'center', 
        justifyContent: "center",
        textAlignVertical : 'center', 
        textAlign:"center",
        alignSelf : 'flex-start',
        paddingLeft :20,
    },
    bg_bar : {
        backgroundColor : "#D9D9D9", 
        height : 10,
        borderRadius : 20
    },
   
})