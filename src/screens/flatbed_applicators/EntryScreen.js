import { StyleSheet, Text, View, Image, Linking, Button } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { selectTheme } from "../../../data/slices/themeSlice"
import PageTopBar from "../../components/PageTopBar"

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const EntryScreen = () => {
    const { t } = useTranslation()
    const theme = useSelector(selectTheme)

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}>
            <PageTopBar title={t("applicators:entry")} />
            <View
                style={{
                    flex: 1,
                    backgroundColor: theme.theme.BACKGROUND_COLOR,
                }}>
                <View style={styles.buttongroup}>
                   <Image
                        source={require("../../../assets/images/Entry.jpg")}
                        style={styles.image}/>
                </View>
                <View style={styles.textgroup}>
                    <Text style={styles.texttitle}>
                                {t("tablescreens:entrytitle")}
                    </Text>
                    <Text style={styles.text}>
                                {t("applicatordescription:entrytable")}
                    </Text>
                </View>
                <View style={styles.manualgroup1}>
                    <Text style={styles.manualtext}>
                        {t("applicatordescription:manual")}
                    </Text>
                </View>
                <View style={styles.manualgroup2}>
                    <MaterialCommunityIcons
                                    name="file"
                                    size={22}  
                                />
                     <Text style={{color: 'blue', marginTop: 2}}
                          onPress={() => Linking.openURL('https://www.rollsroller.com/media/1121/rollsroller-owners-manual.pdf')}>
                         {t("applicatordescription:ownersmanual")}
                    </Text>
                </View>
                <View style={styles.footer}></View>
            </View>
        </SafeAreaView>
    )
}
export default EntryScreen

const styles = StyleSheet.create({
    buttongroup: { 
        alignItems: "center",
        marginTop: 10,
    },
    textgroup: { 
        alignItems: "center",
    },
    texttitle: {
        fontSize: 25,
        fontWeight: "400",
        marginBottom: 20,

    },
    text: {
        color: "grey",
        fontSize: 16,
        fontWeight: "400",
        
        margin: 10,
        textAlign: "left",
    },
    manualgroup1: { 
        flex: 1,
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        margin: 15,
        marginBottom: 1
    },
    manualgroup2: { 
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        margin: 15,
        marginBottom: 115
    },
    manualtext: {
        color: "black",
        fontSize: 25,
        fontWeight: "400",
        marginTop: 5,
        textAlign: "left",
        
    },
    manual: {
        color: "grey",
        fontSize: 18,
        fontWeight: "400",
        textAlign: "left",
        
    },
    image: {
        resizeMode: "contain",
        width: "100%",
    },
    footer: {
        flex: 1,
    },
})
