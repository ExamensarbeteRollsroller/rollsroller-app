import { StyleSheet } from "react-native"

const input = StyleSheet.create({
    textInput: {
        width: "80%",
        fontSize: 20,
        padding: 15,
        backgroundColor: "#E5E5E5",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#fff",
    },
    focusBorder: {
        borderColor: "#000",
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
        fontWeight: "700",
    },
})

export { input }
