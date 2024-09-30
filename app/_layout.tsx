import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native';
import { Slot } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <SafeAreaView>
      <Slot />
    </SafeAreaView>
  );
}
