import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Modal, ActivityIndicator, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchData } from './src/services/api'; // استيراد دالة الاتصال بـ Vercel

const { width } = Dimensions.get('window');

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);

  // دالة التعامل مع الضغط على الأزرار
  const handlePress = async (buttonName) => {
    console.log(`تم الضغط على زر: ${buttonName}`);
    
    if (buttonName === 'البنفسجي') {
      setLoading(true);
      setModalVisible(true);
      
      // جلب البيانات من مسار الـ API (تأكد من وجود مسار باسم 'status' أو 'users' في سيرفر Vercel)
      const result = await fetchData('status'); 
      setApiData(result);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b132b" />
      
      {/* الشعار العلوي */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Rabah<Text style={styles.logoHighlight}>Dj</Text></Text>
      </View>

      {/* مصفوفة الأزرار الملونة */}
      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#8a2be2' }]} onPress={() => handlePress('البنفسجي')}>
            <MaterialCommunityIcons name="connection" size={36} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#d90429' }]} onPress={() => handlePress('الأحمر')}>
            <MaterialCommunityIcons name="database" size={36} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#2a9d8f' }]} onPress={() => handlePress('الأخضر')}>
            <MaterialCommunityIcons name="microphone" size={36} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#4361ee' }]} onPress={() => handlePress('الأزرق')}>
            <MaterialCommunityIcons name="controller-classic" size={36} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.singleRow}>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#f77f00' }]} onPress={() => handlePress('البرتقالي')}>
            <MaterialCommunityIcons name="music-note" size={36} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* النافذة المنبثقة للزر البنفسجي (Modal) */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>حالة الاتصال والشبكة</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              {loading ? (
                <View style={styles.centerFetch}>
                  <ActivityIndicator size="large" color="#8a2be2" />
                  <Text style={styles.loadingText}>جاري الاتصال بسيرفر Vercel...</Text>
                </View>
              ) : (
                <Text style={styles.dataText}>
                  {apiData ? JSON.stringify(apiData, null, 2) : "استجابة السيرفر فارغة أو المسار غير صحيح.\nتأكد من توفر مسار /api/status على Vercel."}
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

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
  
  // تصميم النافذة المنبثقة
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalContent: { height: '60%', backgroundColor: '#1c2541', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#3a506b', paddingBottom: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  modalBody: { flexGrow: 1, paddingVertical: 10 },
  centerFetch: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  loadingText: { color: '#fff', marginTop: 15, fontSize: 16 },
  dataText: { color: '#2a9d8f', fontFamily: 'monospace', fontSize: 14, lineHeight: 20 },
});
