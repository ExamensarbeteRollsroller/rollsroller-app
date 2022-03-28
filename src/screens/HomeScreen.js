import { StyleSheet, Text, View, Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import MenuTopBar from "../components/MenuTopBar"

const HomeScreen = ({ navigation }) => {
    const { t } = useTranslation()

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <MenuTopBar navigation={navigation} />
                <View style={styles.buttongroup}>
                    <Text style={styles.text}>{t("startscreen:welcome")}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#253A70",
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    buttongroup: {
        marginTop: 100,
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "400",
        marginBottom: 20,
    },
})
