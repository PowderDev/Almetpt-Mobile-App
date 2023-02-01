import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "./screens/LoginScreen"
import ScheduleScreen from "./screens/Schedule"
import { Colors } from "./constants/styles"
import { useContext, useEffect } from "react"
import * as SplashScreen from "expo-splash-screen"
import { AppContext, AppContextProvider } from "./components/Context/AppContext"
import { loginStud } from "./lib/http/queries"
import JournalScreen from "./screens/Journal"
import { MMKV } from "react-native-mmkv"

export const storage = new MMKV()

const Stack = createNativeStackNavigator()

SplashScreen.preventAutoHideAsync()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Schedule"
        options={{ headerShown: false, animation: "slide_from_left" }}
        component={ScheduleScreen}
      />
      <Stack.Screen
        name="Journal"
        options={{ headerShown: false, animation: "slide_from_right" }}
        component={JournalScreen}
      />
    </Stack.Navigator>
  )
}

function Navigation() {
  const { isAuth, setIsAuth, setName, setToken } = useContext(AppContext)

  useEffect(() => {
    const name = storage.getString("name")
    const password = storage.getString("password")

    if (name && password) {
      loginStud({ name, password }).then((elco_session) => {
        setName(name)
        setToken(elco_session)
        setIsAuth(true)
      })
    } else {
      setIsAuth(false)
    }

    SplashScreen.hideAsync()
  }, [])

  return (
    <NavigationContainer>{isAuth ? <AuthenticatedStack /> : <AuthStack />}</NavigationContainer>
  )
}

export default function App() {
  return (
    <AppContextProvider>
      <Navigation />
    </AppContextProvider>
  )
}
