import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="index" 
            options={{ 
              title: 'GlowUp.ai',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="auth" 
            options={{ 
              title: 'Authentication',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="camera" 
            options={{ 
              title: 'Take Selfie',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="results" 
            options={{ 
              title: 'Your Glow-Up',
              headerBackVisible: false
            }} 
          />
          <Stack.Screen 
            name="profile" 
            options={{ 
              title: 'Profile',
              presentation: 'modal'
            }} 
          />
        </Stack>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}