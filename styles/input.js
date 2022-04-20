import { StyleSheet } from "react-native"

const input = StyleSheet.create({
    inputContainer: {
        marginLeft: 56,
        marginRight: 56,
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 4,
        alignContent: "flex-start",
    },
    textInput: {
        fontSize: 20,
        padding: 15,
        backgroundColor: "#E5E5E5",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    focusBorder: {
        borderColor: "#586D9F",
    },
    errorContainer: {
        marginTop: 4,
        alignItems: "center",
        width: 300,
    },
    errorTextInvalid: {
        backgroundColor: "rgba(255, 0, 0, 0.3)",
    },
    errorText: {
        width: "80%",
        textAlign: "center",
        borderRadius: 6,
        padding: 8,
        marginTop: 4,
        fontSize: 16,
        fontWeight: "bold",
    },
})

export { input }
