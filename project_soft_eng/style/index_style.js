import { StyleSheet } from "react-native";

export const myStyle = StyleSheet.create({
    bg : {
        height: "100%"
    },
    top_bar : {
        height : 100,
        width : "100%",
        justifyContent: 'center', 
        alignItems: 'center',  
        backgroundColor : "#FFF",
        shadowColor: '#000', 
        shadowOffset: {
            width: 0,
            height: 4,
        },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4, 

    },
    top_bar_content : {
        height : "100%",
        width : "100%",
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingLeft : 40,
        paddingRight : 40
    },
    main_content_box : {
        marginHorizontal:"auto",
        width:"80%",
    },
    main_pocket : {
        backgroundColor : "white",
        width : "100%",
        height : 100,
        borderRadius: 20,
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center",
        marginVertical : 25
    },
    grid : {
        width : "100%",
        height : "200%",
        flexDirection : "row",
        flexWrap : "wrap",
        justifyContent : "space-between",
        marginBottom : 100
    }
})