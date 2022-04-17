import { StyleSheet } from "react-native"

const modal = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 6,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    modalText: {
        fontSize: 16,
    },
    modalHeader: {
        width: "100%",
        alignItems: "center",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        padding: 8,
    },
    modalHeaderText: {
        fontSize: 20,
    },
    line: {
        marginTop: 8,
        width: "100%",
        borderBottomWidth: 1,
    },
})

export { modal }
