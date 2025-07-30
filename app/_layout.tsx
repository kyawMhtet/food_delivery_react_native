import useAuthStore from "@/store/auth.store";
import * as Sentry from '@sentry/react-native';
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import './globals.css';

Sentry.init({
  dsn: 'https://22fb4e72c86ff206537547632c5e28dd@o4509751327653888.ingest.de.sentry.io/4509751329226832',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();

  const [fontLoaded, error] = useFonts({
    "QuickSand-bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-light": require("../assets/fonts/Quicksand-Light.ttf"),
    "QuickSand-medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-semibold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  });

  useEffect(() => {
    if(error) {
      throw error;
    }
    if(fontLoaded) SplashScreen.hideAsync();
  }, [fontLoaded, error]);


  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
});