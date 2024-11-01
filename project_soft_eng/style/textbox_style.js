import { StyleSheet } from "react-native";

export const myStyle = StyleSheet.create({
    card : {
        
        maxWidth:"45%",
        backgroundColor : 'white',
        alignItems : 'center', 
        justifyContent: "center",
        padding:"2%",
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
        marginLeft:"54%",
        maxWidth:"45%",
        backgroundColor : 'white',
        alignItems : 'center', 
        justifyContent: "center",
        textAlign:"center",
        marginTop : 10,
        marginBottom:10,
        padding:"2%",
        borderTopLeftRadius : 15,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        shadowOffset: {},
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4, 
    },
    image : {
        alignItems : 'center',
        justifyContent: "center",
        height :100,
        width : 100,
        borderRadius : 10,
        margin:10,
    },
    container : {
        
        alignItems : "center",
        justifyContent: "center",
        alignItems : 'center', 
       
        alignSelf : 'flex-start',
        
      
    },

    text : {
        flex:1,
       textAlign : "center",
       fontSize : 20,
       
    },
    
    bg_bar : {
        backgroundColor : "#D9D9D9", 
        height : 10,
        borderRadius : 20
    },
   
})