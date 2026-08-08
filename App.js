import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Modal, ActivityIndicator, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchData } from './src/services/api'; 

const { width } = Dimensions.get('window');

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentType, setCurrentType] = useState(''); // 'connections' أو 'database'
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  // دالة التعامل مع الضغط على الأزرار
  const handlePress = async (buttonName) => {
    if (buttonName === 'البنفسجي' || buttonName === 'الأحمر') {
      setLoading(true);
      setModalVisible(true);
      
      const endpoint = buttonName === 'البنفسجي' ? 'connections' : 'database';
      setCurrentType(endpoint);

      const result = await fetchData(endpoint); 
      
      // التحقق من بنية البيانات وتحويلها إلى مصفوفة قابلة للعرض
      if (result && Array.isArray(result)) {
        setFetchedData(result);
      } else if (result && result.data && Array.isArray(result.data)) {
        setFetchedData(result.data);
      } else {
        setFetchedData(result ? [result] : []);
      }
      setLoading(false);
    }
  };

  // تصميم العناصر للقائمة بناءً على نوع الزر المفتوح
  const renderItem = ({ item, index }) => {
    if (currentType === 'connections') {
      return (
        <View style={[styles.itemCard, { borderColor: '#8a2be2' }]}>
          <View style={styles.itemHeader}>
            <MaterialCommunityIcons name="account-circle" size={24} color="#8a2be2" />
            <Text style={styles.itemTitle}>{item.name || item.username || `اتصال #${index + 1}`}</Text>
          </View>
          <Text style={styles.itemDetails}>
            {item.status ? `الحالة: ${item.status}` : ''} 
            {item.ip ? `\nIP: ${item.ip}` : ''}
            {typeof item === 'string' ? item : (!item.name && !item.status ? JSON.stringify(item) : '')}
          </Text>
        </View>
      );
    } else {
      // تصميم بطاقات قاعدة البيانات (الزر الأحمر)
      return (
        <View style={[styles.itemCard, { borderColor: '#d90429' }]}>
          <View style={styles.itemHeader}>
            <MaterialCommunityIcons name="database-marker" size={24} color="#d90429" />
            <Text style={styles.itemTitle}>{item.title || item.id || `سجل #${index + 1}`}</Text>
          </View>
          <Text style={styles.itemDetails}>
            {typeof item === 'object' ? JSON.stringify(item, null, 2) : item}
          </Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b132b" />
      
      <View style={styles.header}>
        <Text style={styles.logoText}>Rabah<Text style={styles.logoHighlight}>Dj</Text></Text>
      </View>

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

      {/* النافذة المنبثقة المشتركة للزرين */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons 
                  name={currentType === 'connections' ? "pulse" : "database"} 
                  size={24} 
                  color={currentType === 'connections' ? "#8a2be2" : "#d90429"} 
                  style={{ marginRight: 8 }} 
                />
                <Text style={styles.modalTitle}>
                  {currentType === 'connections' ? "قائمة الاتصالات الحية" : "سجلات قاعدة البيانات"}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={26} color="#fff" />
              </TouchableOpacity>
            </View>

            {loading ? (
              <View style={styles.centerFetch}>
                <ActivityIndicator size="large" color={currentType === 'connections' ? "#8a2be2" : "#d90429"} />
                <Text style={styles.loadingText}>جاري جلب البيانات من السيرفر...</Text>
              </View>
            ) : fetchedData.length > 0 ? (
              <FlatList
                data={fetchedData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            ) : (
              <View style={styles.centerFetch}>
                <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#d90429" />
                <Text style={styles.errorText}>لم يتم العثور على أي بيانات، أو أن المسار غير مهيأ في الـ Backend.</Text>
              </View>
            )}
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
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-end' },
  modalContent: { height: '70%', backgroundColor: '#1c2541', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#3a506b', paddingBottom: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  centerFetch: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  loadingText: { color: '#fff', marginTop: 15, fontSize: 16 },
  errorText: { color: '#a3b1c6', marginTop: 15, fontSize: 14, textAlign: 'center', paddingHorizontal: 20 },
  
  itemCard: { backgroundColor: '#3a506b', padding: 15, borderRadius: 12, marginBottom: 10, borderWidth: 1 },
  itemHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  itemTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  itemDetails: { color: '#e0e1dd', fontSize: 13, fontFamily: 'monospace', lineHeight: 18 }
});
