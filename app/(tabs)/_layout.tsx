import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Accueil' }}
      />
      <Tabs.Screen
        name="login"
        options={{ title: 'Connexion' }}
      />
      <Tabs.Screen
        name="register"
        options={{ title: 'Inscription' }}
      />
    </Tabs>
  );
}
