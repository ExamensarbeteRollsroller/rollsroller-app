import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { useTranslation } from "react-i18next"
import Ionicons from "react-native-vector-icons/Ionicons"

import HomeScreen from "../screens/HomeScreen"
import LoginScreen from "../screens/LoginScreen"
import MyProfileScreen from "../screens/MyProfileScreen"
import ApplicatorsScreen from "../screens/ApplicatorsScreen"
import MyApplicatorsScreen from "../screens/MyApplicatorsScreen"
import CustomDrawer from "../components/CustomDrawer"

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator()
    const { t } = useTranslation()
    // Use redux to save login details and check whether the user is logged in or not

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: "rgba(37, 58, 112, 0.6)",
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
                        <Ionicons name="home-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name={t("menu:login")}
                component={LoginScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons
                            name="log-in-outline"
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name={t("menu:myprofile")}
                component={MyProfileScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons
                            name="person-outline"
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name={t("menu:myapplicators")}
                component={MyApplicatorsScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons
                            name="easel-outline"
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name={t("menu:applicators")}
                component={ApplicatorsScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons
                            name="briefcase-outline"
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator

const styles = StyleSheet.create({})
