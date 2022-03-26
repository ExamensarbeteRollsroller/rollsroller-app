import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import React from "react"
import { Icon } from "react-native-elements"

const MenuTopBar = ({ navigation }) => {
    // Add the small R icon instead of text, centered

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                    navigation.openDrawer()
                }}
            >
                <Icon type="material-icons" color="white" name="menu" />
            </TouchableOpacity>
            <Text style={styles.text}>Rollsroller</Text>
        </View>
    )
}

export default MenuTopBar

const styles = StyleSheet.create({
    container: {
        height: 56,
        backgroundColor: "#253A70",
        flexDirection: "row",
        alignItems: "center",
        padding: 0,
    },
    iconButton: {
        height: 56,
        width: 56,
        justifyContent: "center",
    },
    text: {
        color: "#fff",
        fontSize: 18,
    },
})
