import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function App() {
  const handlePress = (buttonName) => {
    console.log(`Bouton cliqué : ${buttonName}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b132b" />
      
      <View style={styles.header}>
        <Text style={styles.logoText}>Rabah<Text style={styles.logoHighlight}>Dj</Text></Text>
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#8a2be2' }]} onPress={() => handlePress('Violet')}>
            <MaterialCommunityIcons name="connection" size={36} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#d90429' }]} onPress={() => handlePress('Rouge')}>
            <MaterialCommunityIcons name="database" size={36} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#2a9d8f' }]} onPress={() => handlePress('Vert')}>
            <MaterialCommunityIcons name="microphone" size={36} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#4361ee' }]} onPress={() => handlePress('Bleu')}>
            <MaterialCommunityIcons name="controller-classic" size={36} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.singleRow}>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#f77f00' }]} onPress={() => handlePress('Orange')}>
            <MaterialCommunityIcons name="music-note" size={36} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b132b', alignItems: 'center', justifyContent: 'space-between' },
  header: { marginTop: 50, alignItems: 'center' },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#ffffff', letterSpacing: 1 },
  logoHighlight: { color: '#4361ee' },
  gridContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', paddingHorizontal: 20 },
  row: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16, width: '100%' },
  singleRow: { flexDirection: 'row', justifyContent: 'center', width: '100%' },
  card: { width: width * 0.28, height: width * 0.28, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
});

