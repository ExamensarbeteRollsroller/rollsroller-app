import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
} from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"

import PageTopBar from "../components/PageTopBar"
import { selectApplicators } from "../../data/slices/applicatorsSlice"
import Entry from "../../assets/images/Entry.jpg"
import Regular from "../../assets/images/Regular.jpg"
import Premium from "../../assets/images/Premium.jpg"
import Inventor from "../../assets/images/Inventor.png"
import { buttons } from "../../styles/buttons"
import { selectTheme } from "../../data/slices/themeSlice"

const MyApplicatorsScreen = () => {
    const { t } = useTranslation()
    const navigation = useNavigation()
    const userApplicators = useSelector(selectApplicators)
    const theme = useSelector(selectTheme)

    const imagePaths = {
        Entry: Entry,
        Regular: Regular,
        Premium: Premium,
        Inventor: Inventor,
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}
        >
            <PageTopBar title={t("menu:myapplicators")} />
            <ScrollView
                style={[
                    styles.itemContainer,
                    { backgroundColor: theme.theme.BACKGROUND_COLOR },
                ]}
            >
                {userApplicators === null ? (
                    <></>
                ) : (
                    userApplicators.map((applicator) => (
                        <View
                            style={[
                                styles.item,
                                {
                                    borderBottomWidth: 1,
                                    borderBottomColor: theme.theme.LINE_COLOR,
                                },
                            ]}
                            key={applicator.key}
                        >
                            <Text style={styles.text}>{applicator.name}</Text>
                            <Image
                                source={imagePaths[applicator.product]}
                                style={styles.image}
                            />
                            <View style={styles.buttonGroup}>
                                <TouchableHighlight
                                    style={[
                                        buttons.buttonDynamic,
                                        { marginRight: 16 },
                                    ]}
                                    onPress={() => {
                                        navigation.navigate(
                                            applicator.name + "SettingScreen",
                                            {
                                                key: applicator.key,
                                                name: applicator.name,
                                                product: applicator.product,
                                                connectionIP:
                                                    applicator.connectionIP,
                                                light: applicator.light,
                                            }
                                        )
                                        console.log(t("myapplicators:settings"))
                                    }}
                                    underlayColor={
                                        theme.theme.BUTTON_PRESS_COLOR
                                    }
                                    activeOpacity={1}
                                >
                                    <Text style={buttons.buttonText}>
                                        {t("myapplicators:settings")}
                                    </Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={buttons.buttonDynamic}
                                    onPress={() => {
                                        navigation.navigate(
                                            applicator.name +
                                                "ConnectionScreen",
                                            {
                                                key: applicator.key,
                                                name: applicator.name,
                                                product: applicator.product,
                                                connectionIP:
                                                    applicator.connectionIP,
                                                light: applicator.light,
                                            }
                                        )
                                        console.log(t("myapplicators:connect"))
                                    }}
                                    underlayColor={
                                        theme.theme.BUTTON_PRESS_COLOR
                                    }
                                    activeOpacity={1}
                                >
                                    <Text style={buttons.buttonText}>
                                        {t("myapplicators:connect")}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    ))
                )}
                <View style={styles.item}>
                    <TouchableHighlight
                        style={buttons.buttonDynamic}
                        onPress={() => {
                            navigation.navigate("NewApplicatorScreen")
                            console.log(t("myapplicators:addnewapplicator"))
                        }}
                        underlayColor={theme.theme.BUTTON_PRESS_COLOR}
                        activeOpacity={1}
                    >
                        <Text style={buttons.buttonText}>
                            {t("myapplicators:addnewapplicator")}
                        </Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyApplicatorsScreen

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: "column",
    },
    item: {
        alignItems: "center",
        padding: 16,
    },
    text: {
        fontSize: 20,
        fontWeight: "400",
        marginBottom: 20,
        color: "#000",
    },
    image: {
        height: 150,
        resizeMode: "contain",
    },
    buttonGroup: {
        flexDirection: "row",
    },
})
