import { StyleSheet } from "react-native";

export const myStyle = StyleSheet.create({
    bg : {
        height: "100%",
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
        paddingHorizontal : 40,
        overflow : "visible",
    },
    profile : {
        width: 70,
        height: 70,
        borderRadius: 35 
    },
    main_content_box : {        
        paddingHorizontal: "10%",
        zIndex : 0
    },
    main_pocket : {
        position : 'relative',
        backgroundColor : "white",
        width : "100%",
        height : 100,
        borderRadius: 20,
        flexDirection : "row",
        justifyContent : "space-around",
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
        position : "absolute",
        bottom : 90,
        right : 20,
        backgroundColor : "#38E298",
        width : 120,
        height : 40,
        borderRadius : 100,
        marginLeft : "auto",
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