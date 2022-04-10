import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    Pressable,
} from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"

import PageTopBar from "../components/PageTopBar"
import { selectTheme } from "../../data/slices/themeSlice"

const ApplicatorsScreen = () => {
    const { t } = useTranslation()
    const navigation = useNavigation()
    const theme = useSelector(selectTheme)

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}
        >
            <PageTopBar title={t("menu:applicators")} />
            <View
                style={{
                    flex: 1,
                    backgroundColor: theme.theme.BACKGROUND_COLOR,
                }}
            >
                <TouchableOpacity
                    style={[
                        styles.container,
                        styles.line,
                        {
                            borderBottomColor: theme.theme.LINE_COLOR,
                            backgroundColor: theme.theme.BACKGROUND_COLOR,
                        },
                    ]}
                    onPress={() => {
                        navigation.navigate("InventorScreen")
                    }}
                >
                    <Image
                        source={require("../../assets/images/Inventor.png")}
                        style={styles.logo}
                    />
                    <View style={styles.textgroup}>
                        <Text style={styles.text}>
                            {t("applicators:inventor")}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.container,
                        styles.line,
                        {
                            borderBottomColor: theme.theme.LINE_COLOR,
                            backgroundColor: theme.theme.BACKGROUND_COLOR,
                        },
                    ]}
                    onPress={() => {
                        navigation.navigate("PremiumScreen")
                    }}
                >
                    <Image
                        source={require("../../assets/images/Premium.jpg")}
                        style={styles.logo}
                    />
                    <View style={styles.textgroup}>
                        <Text style={styles.text}>
                            {t("applicators:premium")}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.container,
                        styles.line,
                        {
                            borderBottomColor: theme.theme.LINE_COLOR,
                            backgroundColor: theme.theme.BACKGROUND_COLOR,
                        },
                    ]}
                    onPress={() => {
                        navigation.navigate("RegularScreen")
                    }}
                >
                    <Image
                        source={require("../../assets/images/Regular.jpg")}
                        style={styles.logo}
                    />
                    <View style={styles.textgroup}>
                        <Text style={styles.text}>
                            {t("applicators:regular")}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.container,
                        styles.line,
                        {
                            borderBottomColor: theme.theme.LINE_COLOR,
                            backgroundColor: theme.theme.BACKGROUND_COLOR,
                        },
                    ]}
                    onPress={() => {
                        navigation.navigate("EntryScreen")
                    }}
                >
                    <Image
                        source={require("../../assets/images/Entry.jpg")}
                        style={styles.logo}
                    />
                    <View style={styles.textgroup}>
                        <Text style={styles.text}>
                            {t("applicators:entry")}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ApplicatorsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    textgroup: {
        alignItems: "center",
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: "400",
    },
    logo: {
        width: "100%",
        flex: 1,
        resizeMode: "contain",
    },
    line: {
        borderBottomWidth: 1,
    },
})
