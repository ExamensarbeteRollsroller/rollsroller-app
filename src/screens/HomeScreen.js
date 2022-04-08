import { StyleSheet, Text, View, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import YoutubePlayer from "react-native-youtube-iframe"
import MenuTopBar from "../components/MenuTopBar"

const HomeScreen = () => {
    const { t } = useTranslation()

    return (
        <SafeAreaView style={styles.safeArea}>
            <MenuTopBar />
            <View style={styles.container}>
                <View style={styles.video}>
                    <YoutubePlayer
                        height={300}
                        play={false}
                        videoId={"gphIFfDERjM"}
                    />
                </View>
                <View style={styles.buttongroup}>
                    <Text style={styles.text}>{t("startscreen:welcome")}</Text>
                    <Text style={styles.breadText}>
                        {t("startscreen:lorem")}
                    </Text>
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
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "400",
        marginBottom: 20,
    },
    breadText: {
        fontSize: 18,
        fontWeight: "400",
        marginLeft: 15,
        marginRight: 15,
    },
    video: {
        /*Do we even need to modify it? Looks alright already */
    },
})
