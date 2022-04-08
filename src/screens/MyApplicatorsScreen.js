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
import PageTopBar from "../components/PageTopBar"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { selectApplicators } from "../../data/slices/applicatorsSlice"
import Entry from "../../assets/images/Entry.jpg"
import Regular from "../../assets/images/Regular.jpg"
import Premium from "../../assets/images/Premium.jpg"
import Inventor from "../../assets/images/Inventor.png"

const MyApplicatorsScreen = () => {
    const { t } = useTranslation()
    const navigation = useNavigation()
    const userApplicators = useSelector(selectApplicators)

    const imagePaths = {
        Entry: Entry,
        Regular: Regular,
        Premium: Premium,
        Inventor: Inventor,
    }

    const path = "../../assets/images/Entry.jpg"

    return (
        <SafeAreaView style={styles.safeArea}>
            <PageTopBar title={t("menu:myapplicators")} />
            <ScrollView style={styles.itemContainer}>
                {userApplicators === null ? (
                    <></>
                ) : (
                    userApplicators.map((applicator) => (
                        <View
                            style={[styles.item, styles.line]}
                            key={applicator.key}
                        >
                            <Text style={styles.text}>{applicator.name}</Text>
                            <Image
                                source={imagePaths[applicator.product]}
                                style={styles.image}
                            />
                            <TouchableHighlight
                                style={styles.button}
                                onPress={() => {
                                    navigation.navigate(applicator.name, {
                                        key: applicator.key,
                                        name: applicator.name,
                                        product: applicator.product,
                                        connectionIP: applicator.connectionIP,
                                        light: applicator.light,
                                    })
                                    console.log(t("myapplicators:settings"))
                                }}
                                underlayColor="#3b5591"
                                activeOpacity={1}
                            >
                                <Text style={styles.buttonText}>
                                    {t("myapplicators:settings")}
                                </Text>
                            </TouchableHighlight>
                        </View>
                    ))
                )}
                <View style={styles.item}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            console.log(t("myapplicators:addnewapplicator"))
                        }}
                        underlayColor="#3b5591"
                        activeOpacity={1}
                    >
                        <Text style={styles.buttonText}>
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
    safeArea: {
        backgroundColor: "#253A70",
        flex: 1,
    },
    itemContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
    },
    item: {
        alignItems: "center",
        padding: 12,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: "#000",
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
    button: {
        backgroundColor: "#253A70",
        alignItems: "center",
        borderRadius: 6,
        marginTop: 16,
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    buttonText: {
        fontSize: 16,
        color: "#FFFFFF",
    },
})
