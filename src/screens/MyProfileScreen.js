import { StyleSheet, Text, View, StatusBar } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import PageTopBar from "../components/PageTopBar"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { selectTheme } from "../../data/slices/themeSlice"
import { selectApplicators } from "../../data/slices/applicatorsSlice"
import { selectUserData } from "../../data/slices/userSlice"

const MyProfileScreen = () => {
    const { t } = useTranslation()
    const theme = useSelector(selectTheme)
    const userData = useSelector(selectUserData)
    const userApplicators = useSelector(selectApplicators)

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}
        >
            <PageTopBar title={t("menu:myprofile")} />
            <View
                style={{
                    flex: 1,
                    backgroundColor: theme.theme.BACKGROUND_COLOR,
                }}
            >
                <View style={styles.container}>
                    <View style={styles.textpadding}>
                        <Text
                            style={[
                                styles.prompttext,
                                { color: theme.theme.TEXT_COLOR },
                            ]}
                        >
                            {t("myprofile:emailprompt")}
                        </Text>
                        <Text
                            style={[
                                styles.text,
                                { color: theme.theme.TEXT_COLOR },
                            ]}
                        >
                            {userData.email}
                        </Text>
                    </View>
                    <View style={styles.textpadding}>
                        <Text
                            style={[
                                styles.prompttext,
                                { color: theme.theme.TEXT_COLOR },
                            ]}
                        >
                            {t("myprofile:firstnameprompt")}
                        </Text>
                        <Text
                            style={[
                                styles.text,
                                { color: theme.theme.TEXT_COLOR },
                            ]}
                        >
                            {userData.fname}
                        </Text>
                    </View>
                    <View style={styles.textpadding}>
                        <Text
                            style={[
                                styles.prompttext,
                                { color: theme.theme.TEXT_COLOR },
                            ]}
                        >
                            {t("myprofile:lastnameprompt")}
                        </Text>
                        <Text
                            style={[
                                styles.text,
                                { color: theme.theme.TEXT_COLOR },
                            ]}
                        >
                            {userData.lname}
                        </Text>
                    </View>
                    <View style={styles.textpadding}>
                        <Text
                            style={[
                                styles.prompttext,
                                { color: theme.theme.TEXT_COLOR },
                            ]}
                        >
                            {t("myprofile:companyprompt")}
                        </Text>
                        <Text
                            style={[
                                styles.text,
                                { color: theme.theme.TEXT_COLOR },
                            ]}
                        >
                            {userData.company}
                        </Text>
                    </View>
                    {userApplicators !== null && (
                        <View style={styles.applicators}>
                            <Text
                                style={[
                                    styles.prompttext,
                                    { color: theme.theme.TEXT_COLOR },
                                ]}
                            >
                                {t("myprofile:applicatorsprompt")}
                            </Text>
                            {userApplicators.map((applicator) => (
                                <Text
                                    key={applicator.name}
                                    style={[
                                        styles.text,
                                        { color: theme.theme.TEXT_COLOR },
                                    ]}
                                >
                                    {applicator.name}
                                </Text>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MyProfileScreen

const styles = StyleSheet.create({
    container: {
        margin: 56,
    },
    prompttext: {
        fontSize: 18,
        fontWeight: "700",
        paddingBottom: 4,
    },
    text: {
        fontSize: 18,
    },
    textpadding: {
        paddingBottom: 16,
    },
    applicators: {
        marginTop: 32,
    },
})
