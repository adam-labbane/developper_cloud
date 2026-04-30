import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import '../firebaseConfig';
import { Toast } from '../components/toast';
import { useState } from 'react';

export default function ProfileScreen() {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as 'success' | 'error' });

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2500);
  }

  function handleLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        showToast('Déconnexion réussie.', 'success');
        setTimeout(() => router.replace('/(tabs)/login'), 1000);
      })
      .catch(() => {
        showToast('Erreur lors de la déconnexion.', 'error');
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ici s'affichera prochainement votre profil</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
