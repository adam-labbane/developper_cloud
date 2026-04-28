import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { signin } from '../../auth_signin_password';
import { signinWithGithub } from '../../firebase/auth_github_signin_popup';
import { Toast } from '../../components/toast';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as 'success' | 'error' });

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2500);
  }

  async function handleLogin() {
    if (!email || !password) {
      showToast('Veuillez remplir tous les champs.', 'error');
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      showToast('Format d\'email invalide.', 'error');
      return;
    }
    if (password.length < 6) {
      showToast('Le mot de passe doit contenir au moins 6 caractères.', 'error');
      return;
    }
    try {
      await signin(email, password);
      showToast('Connexion réussie !', 'success');
      setTimeout(() => router.replace('/profile'), 1000);
    } catch (e) {
      showToast('Email ou mot de passe incorrect.', 'error');
    }
  }

  async function handleGithubLogin() {
    try {
      await signinWithGithub();
      showToast('Connexion GitHub réussie !', 'success');
      setTimeout(() => router.replace('/profile'), 1000);
    } catch (e) {
      showToast('Erreur de connexion GitHub.', 'error');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.githubButton} onPress={handleGithubLogin}>
        <Text style={styles.buttonText}>Se connecter avec GitHub</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    margin: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  githubButton: {
    backgroundColor: '#24292e',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
