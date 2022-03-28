import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native"
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
                <Icon size={36} type="material-icons" color="white" name="menu" />
            </TouchableOpacity>
            <Image
                        source={require("../../assets/images/rollsrollerlogo.png")}
                        style={styles.logo}
                    />
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
    logo: {
        width: 25,
        height: 25,
        flex: 1,
        marginRight: "15%",
        alignItems: "center",
        resizeMode: 'contain'
    },
})
