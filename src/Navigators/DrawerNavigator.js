import { StyleSheet } from "react-native"
import React, { useEffect, useState } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { useTranslation } from "react-i18next"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import * as SecureStore from "expo-secure-store"
import { useDispatch, useSelector } from "react-redux"

import HomeScreen from "../screens/HomeScreen"
import LoginScreen from "../screens/LoginScreen"
import MyProfileScreen from "../screens/MyProfileScreen"
import MyApplicatorsStackNavigator from "./MyApplicatorsStackNavigator"
import ApplicatorsScreen from "../screens/ApplicatorsScreen"
import SupportScreen from "../screens/SupportScreen"
import SocialmediaScreen from "../screens/SocialmediaScreen"
import CustomDrawer from "../components/CustomDrawer"
import SplashScreen from "../screens/SplashScreen"
import {
    setEmail,
    setFname,
    setLname,
    setCompany,
    selectEmail,
} from "../../data/slices/userSlice"
import { setApplicators } from "../../data/slices/applicatorsSlice"

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const userEmail = useSelector(selectEmail)
    const [userData, setUserData] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const _userData = await SecureStore.getItemAsync("_userData")
            if (_userData !== null && _userData !== "null") {
                const values = JSON.parse(_userData)
                dispatch(
                    setEmail(values.email),
                    setFname(values.fname),
                    setLname(values.lname),
                    setCompany(values.company)
                )
            }
            setUserData(_userData)
        }
        const fetchApplicators = async () => {
            const _applicators = await SecureStore.getItemAsync(
                "_userApplicators"
            )
            if (_applicators !== null && _applicators !== "null") {
                const values = JSON.parse(_applicators)
                dispatch(setApplicators(values))
            }
        }
        fetchData().catch(console.error)
        fetchApplicators().catch(console.error)
    }, [])

    return (
        <>
            {userData === "" && <SplashScreen />}
            {userData !== "" && (
                <Drawer.Navigator
                    screenOptions={{
                        headerShown: false,
                        drawerActiveBackgroundColor: "#586d9f",
                        drawerActiveTintColor: "#fff",
                        drawerLabelStyle: {
                            marginLeft: -20,
                            fontSize: 15,
                        },
                    }}
                    drawerContent={(props) => <CustomDrawer {...props} />}
                >
                    <Drawer.Screen
                        name={t("menu:home")}
                        component={HomeScreen}
                        options={{
                            drawerIcon: ({ color }) => (
                                <MaterialIcons
                                    name="home"
                                    size={22}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    {userEmail === null && (
                        <Drawer.Screen
                            name={t("menu:login")}
                            component={LoginScreen}
                            options={{
                                drawerIcon: ({ color }) => (
                                    <MaterialCommunityIcons
                                        name="login-variant"
                                        size={22}
                                        color={color}
                                    />
                                ),
                            }}
                        />
                    )}
                    {userEmail !== null && (
                        <Drawer.Screen
                            name={t("menu:myprofile")}
                            component={MyProfileScreen}
                            options={{
                                drawerIcon: ({ color }) => (
                                    <MaterialIcons
                                        name="person"
                                        size={22}
                                        color={color}
                                    />
                                ),
                            }}
                        />
                    )}
                    {userEmail !== null && (
                        <Drawer.Screen
                            name={t("menu:myapplicators")}
                            component={MyApplicatorsStackNavigator}
                            options={{
                                drawerIcon: ({ color }) => (
                                    <MaterialCommunityIcons
                                        name="briefcase-account"
                                        size={22}
                                        color={color}
                                    />
                                ),
                            }}
                        />
                    )}
                    <Drawer.Screen
                        name={t("menu:applicators")}
                        component={ApplicatorsScreen}
                        options={{
                            drawerIcon: ({ color }) => (
                                <MaterialCommunityIcons
                                    name="briefcase"
                                    size={22}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name={t("menu:support")}
                        component={SupportScreen}
                        options={{
                            drawerIcon: ({ color }) => (
                                <MaterialCommunityIcons
                                    name="headset"
                                    size={22}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name={t("menu:socialmedia")}
                        component={SocialmediaScreen}
                        options={{
                            drawerIcon: ({ color }) => (
                                <MaterialCommunityIcons
                                    name="youtube"
                                    size={22}
                                    color={color}
                                />
                            ),
                        }}
                    />
                </Drawer.Navigator>
            )}
        </>
    )
}

export default DrawerNavigator

const styles = StyleSheet.create({})
