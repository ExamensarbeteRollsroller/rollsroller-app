import { StyleSheet } from "react-native"

const buttons = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        color: "#FFFFFF",
    },
    buttonDynamic: {
        backgroundColor: "#253A70",
        alignItems: "center",
        borderRadius: 6,
        marginTop: 16,
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    buttonStatic: {
        backgroundColor: "#253A70",
        alignItems: "center",
        borderRadius: 6,
        marginTop: 16,
        padding: 8,
        width: "60%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
})

export { buttons }
