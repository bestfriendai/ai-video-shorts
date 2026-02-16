import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useRevenueCat } from '../src/services/purchases';

export default function PaywallScreen() {
  const { currentOffering, upgradeToPro } = useRevenueCat();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>✨ Go PRO</Text>
        <Text style={styles.subtitle}>Unlock unlimited video generations and HD exports.</Text>

        <View style={styles.card}>
          <Text style={styles.plan}>Monthly: {currentOffering?.monthlyPrice}</Text>
          <Text style={styles.plan}>Yearly: {currentOffering?.yearlyPrice}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            upgradeToPro();
            router.back();
          }}
        >
          <Text style={styles.buttonText}>Upgrade Now</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.later}>Maybe later</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  content: { flex: 1, justifyContent: 'center', padding: 24, gap: 16 },
  title: { color: '#fff', fontSize: 34, fontWeight: '700' },
  subtitle: { color: '#8b8b9e', fontSize: 16 },
  card: { backgroundColor: '#252542', borderRadius: 16, padding: 16, gap: 8 },
  plan: { color: '#fff', fontSize: 16 },
  button: { backgroundColor: '#ff2d6a', borderRadius: 12, padding: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  later: { color: '#8b8b9e', textAlign: 'center' },
});
