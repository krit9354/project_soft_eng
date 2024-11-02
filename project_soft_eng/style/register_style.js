import { StyleSheet } from "react-native";

export const myStyle = StyleSheet.create({
    bg : {
        height: "100%",
        
        alignItems : 'center',
        width : "100%",
    },
    top_bar : {
        height : 100,
        width : "100%",
        backgroundColor : "#FFF",
        shadowColor: '#000', 
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4, 

    },
    top_bar_content : {
        height: "100%",
        width : "100%",
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingLeft : 40,
        paddingRight : 40,
        
    },
    main_content_box : {        
        paddingHorizontal: "10%",

        zIndex : 0
    },
    main_pocket : {
        
        backgroundColor : "white",
        width : "70%",
        height: "60%",
        borderRadius: 20,
        flexDirection : "colum",
        justifyContent : 'space-evenly',
        alignItems : "center",
        marginVertical : 25,
        shadowOffset: {
            width: 0,
            height: 4,
        },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4, 
    },
    main_pocket2 : {
        
        backgroundColor : "white",
        width : "100%",
        height: "68%",
        
        flexDirection : "colum",
       
        alignItems : "center",
     
       
    },
    pocket : {
        
        backgroundColor : "white",
        width : "60%",
        height: "10%",
        borderRadius: 35,
        borderWidth: 2,
        padding: 10,
        flexDirection : "colum",
        alignItems : "center",
        marginVertical : 25,
        shadowOffset: {
            width: 0,
            height: 4,
        },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4, 
    },
    grid : {
        width : "100%",
        height : "100%",
        flexDirection : "row",
        flexWrap : "wrap",
        justifyContent : "space-between",
        marginBottom : 100               
    },
    add_pocket : {
      
        backgroundColor : "#38E298",
        width : "80%",
        height: "10%",
        borderRadius : 100,
    
        justifyContent : "center",
        alignItems : "center",
        shadowColor: '#000', 
        shadowOffset: {
            width: 0,
            height: 4,
        },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4, 
    },
})