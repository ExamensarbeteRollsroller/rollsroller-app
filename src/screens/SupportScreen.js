import { StyleSheet, Text, View, StatusBar, TouchableHighlight, Modal, TextInput, Linking } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import PageTopBar from "../components/PageTopBar"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { selectTheme } from "../../data/slices/themeSlice"
import { buttons } from "../../styles/buttons"
import { useNavigation } from "@react-navigation/native"
import { Dropdown } from "react-native-element-dropdown"


import {
    setApplicators,
    selectApplicators,
} from "../../data/slices/applicatorsSlice"


import { input } from "../../styles/input"

const problems = [
    { name: "Roller does not move" },
    { name: "QR Code does not register" },
    { name: "Missing parts" },
    { name: "Other" },
]
/* MAILTO FÖR ATT SKICKA FORMULÄRET?!?!?!?! \\\   */
const SupportScreen = (props) => {
    const [description, setDescription] = useState("false");
    const [table, setTable] = useState("false");
    const [category, setCategory] = useState("false");
    const [subject, setSubject] = useState("false");
    const { t } = useTranslation()
    const theme = useSelector(selectTheme)
    const navigation = useNavigation()
    const [dropdownfocus, setDropdownfocus] = useState(false)
    const userApplicators = useSelector(selectApplicators)
    const [productValue, setProductValue] = useState("Inventor")


    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.theme.PRIMARY_COLOR }}
        >
            <PageTopBar title={t("menu:support")} />
            <View
                style={{
                    flex: 1,
                    backgroundColor: theme.theme.BACKGROUND_COLOR,
                }}
            >
                <View style={styles.buttongroup}>
                    <Text
                        style={[styles.text, { color: theme.theme.TEXT_COLOR }]}>
                        {t("support:info")}
                    </Text>
                    <Text
                        style={[styles.breadtext, { color: theme.theme.TEXT_COLOR }]}>
                        {t("support:infotelefon")}
                    </Text>
                    <Text
                        style={[styles.breadtext, { color: theme.theme.TEXT_COLOR }]}>
                        {t("support:infoemail")}
                    </Text>
                </View>
                <View style={styles.buttongroup}>
              <Text
                        style={[styles.text, { color: theme.theme.TEXT_COLOR }]}>
                        {t("support:support")}
                    </Text>
                    <Text
                        style={[styles.breadtext, { color: theme.theme.TEXT_COLOR }]}>
                        {t("support:supporttelefon")}
                    </Text>
                    <Text
                        style={[styles.breadtext, { color: theme.theme.TEXT_COLOR }]}>
                        {t("support:supportemail")}
                    </Text>
                </View>
                <View style={styles.buttongroup}>
                 <Text
                        style={[styles.text, { color: theme.theme.TEXT_COLOR }]}>
                        {t("support:logistics")}
                    </Text>
                    <Text
                        style={[styles.breadtext, { color: theme.theme.TEXT_COLOR }]}>
                        {t("support:logitelefon")}
                    </Text>
                    <Text
                        style={[styles.breadtext, { color: theme.theme.TEXT_COLOR }]}>
                        {t("support:logiemail")}
                    </Text>
                </View>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            
                            <Text
                            style={[
                                input.label,
                                { color: theme.theme.TEXT_COLOR },
                            ]}
                        >
                            {t("support:formproblem")}
                            </Text>
                            <Dropdown
                                style={[styles.dropdown,
                                    input.textInput,
                                    dropdownfocus && {
                                        borderColor:
                                            theme.theme.ACTIVE_COMPONENT_COLOR,
                                    },
                                ]}
                                placeholderStyle={styles.dropdownPlaceholderStyle}
                                data={userApplicators}
                                maxHeight={240}
                                value={1}
                                labelField="name"
                                
                                onFocus={() => setDropdownfocus(true)}
                                onBlur={() => setDropdownfocus(false)}
                                onChange={(item) => {
                                    setTable(item.name)
                                    setDropdownfocus(false)
                                }}
                            />
                            <Text
                            style={[
                                input.label,
                                { color: theme.theme.TEXT_COLOR },
                            ]}
                        >
                            {t("support:formproblemcategory")}
                            </Text>
                            <Dropdown
                                style={[styles.dropdown,
                                    input.textInput,
                                    dropdownfocus && {
                                        borderColor:
                                            theme.theme.ACTIVE_COMPONENT_COLOR,
                                    },
                                ]}
                                placeholderStyle={styles.dropdownPlaceholderStyle}
                                data={problems}
                                maxHeight={240}
                                value={1}
                                labelField="name"
                                
                                onFocus={() => setDropdownfocus(true)}
                                onBlur={() => setDropdownfocus(false)}
                                onChange={(item) => {
                                    setCategory(item.name)
                                    setDropdownfocus(false)
                                }}
                            />
                            <Text style={[
                                input.label,
                                { color: theme.theme.TEXT_COLOR },
                            ]}>{t("support:formsubject")}</Text>
                            <TextInput style={[styles.input, input.textInput]}
                            onChangeText={(value) => (setSubject(value))}
                            placeholder={
                                t("support:formsubject") +
                                "                                       " //Added spaces to make the textInput fill to the sides
                            }>

                            </TextInput>
                            <Text style={[
                                input.label,
                                { color: theme.theme.TEXT_COLOR },
                            ]}>{t("support:formdescription")}</Text>
                            <TextInput style={[styles.description, input.textInput] }
                            
                            multiline={true}
                            onChangeText={(value) => (setDescription(value))}
                            placeholder={
                                t("support:formdescription") +
                                "                                       " //Added spaces to make the textInput fill to the sides
                                
                            }>

                            </TextInput>
                            <TouchableHighlight
                                style={[buttons.buttonDynamic, {height: 100, width: "90%"}]}
                                
                                onPress={() =>  {Linking.openURL("mailto:mattias_k60@hotmail.com?subject=" + t("support:customersupp") + "&body=" + "Bordet:" + table + "%0D%0A %0D%0A Kategori:" + category + "%0D%0A %0D%0A Ämne:" + subject + "%0D%0A %0D%0A Beskrivning:" + description);
                                setModalVisible(!modalVisible)}}
                                >
                                 <Text style={styles.contacttext}>
                                 {t("support:formsend")}
                                 </Text>
                            </TouchableHighlight>
                        </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.buttongroup}>
                <TouchableHighlight
                        style={[buttons.buttonDynamic, {height: 100, width: 250}]}
                        onPress={() => {
                            setModalVisible(true)
                        }}
                        underlayColor={theme.theme.BUTTON_PRESS_COLOR}
                        activeOpacity={1}
                    >
                        <Text style={styles.contacttext}>
                            {t("support:contactform")}
                        </Text>
                </TouchableHighlight> 
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SupportScreen

const styles = StyleSheet.create({
    buttongroup: {
        marginTop: 70,
        alignItems: "center",
        textAlign: "left",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        
    },
    breadtext: {
        fontSize: 15,
        fontWeight: "400",
    },
    contacttext: {
        fontSize: 22,
        color: "#FFFF",
        fontWeight: "400",
    },
    centeredView: {
        
        justifyContent: "center",
        alignItems: "center",
        marginTop: 21
      },
    modalView: {
        marginTop: 70,
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFF",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        elevation: 5
      },
      input: {
        width: "90%"
      },
    dropdown: {
        width: "90%",  
    },
    description: {
        height: "20%",
        textAlignVertical: "top",
        maxWidth: "90%"
        
        
    }
})
