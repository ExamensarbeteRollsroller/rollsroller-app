import { StyleSheet, Text, View, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import YoutubePlayer from "react-native-youtube-iframe"
import { useSelector } from "react-redux"

import MenuTopBar from "../components/MenuTopBar"
import { selectTheme } from "../../data/slices/themeSlice"

const HomeScreen = () => {
    const { t } = useTranslation()
    const theme = useSelector(selectTheme)

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}
        >
            <MenuTopBar />
            <View
                style={{
                    flex: 1,
                    backgroundColor: theme.theme.BACKGROUND_COLOR,
                }}
            >
                <View style={styles.video}>
                    <YoutubePlayer
                        height={250}
                        play={false}
                        videoId={"rxs2CLqFVXE"}
                    />
                </View>
                <View style={styles.container}>
                    <Text
                        style={[styles.text, { color: theme.theme.TEXT_COLOR }]}
                    >
                        {t("startscreen:welcome")}
                    </Text>
                    <Text
                        style={[
                            styles.breadText,
                            { color: theme.theme.TEXT_COLOR },
                        ]}
                    >
                        {t("startscreen:info")}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginLeft: 56,
        marginRight: 56,
    },
    text: {
        fontSize: 20,
        fontWeight: "400",
        marginBottom: 20,
    },
    breadText: {
        fontSize: 18,
        fontWeight: "400",
    },
    video: {
        /*Do we even need to modify it? Looks alright already */
    },
})
