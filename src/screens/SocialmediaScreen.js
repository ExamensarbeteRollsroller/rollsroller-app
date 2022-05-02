import { StyleSheet, Text, View, StatusBar, Linking } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { selectTheme } from "../../data/slices/themeSlice"
import PageTopBar from "../components/PageTopBar"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const SocialmediaScreen = () => {
    const { t } = useTranslation()
    const theme = useSelector(selectTheme)
    /*Idé,  Knappar till vänster, beskrivning av innehåll på varje sociala medier, typ att man kan hitta instruktioner för borden på youtube, för tryhard?  */
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}
        >
            <PageTopBar title={t("menu:socialmedia")} />
            <View
                style={{
                    flex: 1,
                    backgroundColor: theme.theme.BACKGROUND_COLOR,
                }}
            >
                <View style={styles.buttongroup}>
                <MaterialCommunityIcons
                                    name="youtube"
                                    size={22}  
                                />
                 <Text style={{color: 'blue', marginTop: 2}}
                          onPress={() => Linking.openURL('https://www.youtube.com/user/ROLLSROLLER')}>
                         {t("social:youtube")}
                    </Text>
                </View>
                <View style={styles.buttongroup}>
                <MaterialCommunityIcons
                                    name="instagram"
                                    size={22}  
                                />
                 <Text style={{color: 'blue', marginTop: 2}}
                          onPress={() => Linking.openURL('https://www.instagram.com/rollsroller_flatbed_applicator/')}>
                         {t("social:instagram")}
                    </Text>
                </View>
                <View style={styles.buttongroup}>
                <MaterialCommunityIcons
                                    name="facebook"
                                    size={22}  
                                />
                 <Text style={{color: 'blue', marginTop: 2}}
                          onPress={() => Linking.openURL('https://www.facebook.com/rollsroller')}>
                         {t("social:facebook")}
                    </Text>
                </View>
                <View style={styles.buttongroup}>
                <MaterialCommunityIcons
                                    name="twitter"
                                    size={22}  
                                />
                 <Text style={{color: 'blue', marginTop: 2}}
                          onPress={() => Linking.openURL('https://www.twitter.com/rollsroller')}>
                         {t("social:twitter")}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SocialmediaScreen

const styles = StyleSheet.create({
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
