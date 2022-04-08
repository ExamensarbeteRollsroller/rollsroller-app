import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    StatusBar,
} from "react-native"
import React from "react"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native"

const MenuTopBar = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1b2a58" />
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                    navigation.openDrawer()
                }}
            >
                <MaterialIcons name="menu" size={36} color={"white"} />
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
        paddingLeft: 12,
        justifyContent: "center",
    },
    logo: {
        width: 24,
        height: 24,
        flex: 1,
        marginRight: "15%",
        alignItems: "center",
        resizeMode: "contain",
    },
})
