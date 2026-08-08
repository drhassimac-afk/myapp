import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Modal, ActivityIndicator, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchData } from './src/services/api'; 

const { width } = Dimensions.get('window');

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentType, setCurrentType] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  // دالة التعامل مع الضغط وجلب البيانات
  const handlePress = async (buttonName, endpoint) => {
    setLoading(true);
    setModalVisible(true);
    setCurrentType(buttonName);

    // طلب المسار من Vercel
    const result = await fetchData(endpoint); 
    
    if (result && Array.isArray(result)) {
      setFetchedData(result);
    } else if (result && result.data && Array.isArray(result.data)) {
      setFetchedData(result.data);
    } else {
      setFetchedData(result ? [result] : []);
    }
    setLoading(false);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemDetails}>
        {typeof item === 'object' ? JSON.stringify(item, null, 2) : item}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b132b" />
      
      {/* الشعار العلوي المطابق */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Rabah<Text style={styles.logoHighlight}>Dj</Text></Text>
        <Text style={styles.subTitle}>شبكتك الاجتماعية المحلية</Text>
        <Text style={styles.descText}>اتصل، شارك، وابث صوتاً وفيديو مع أصدقائك</Text>
      </View>

      {/* مصفوفة الأزرار المطابقة تماماً للموقع */}
      <View style={styles.gridContainer}>
        
        {/* الصف الأول */}
        <View style={styles.row}>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#8a2be2' }]} onPress={() => handlePress('بث مباشر', 'connections')}>
            <MaterialCommunityIcons name="radio-tower" size={40} color="#fff" />
            <Text style={styles.cardText}>بث مباشر</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.card, { backgroundColor: '#d90429' }]} onPress={() => handlePress('سينما وتلفاز', 'products')}>
            <MaterialCommunityIcons name="movie-roll" size={40} color="#fff" />
            <Text style={styles.cardText}>سينما وتلفاز</Text>
          </TouchableOpacity>
        </View>

        {/* الصف الثاني */}
        <View style={styles.row}>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#2a9d8f' }]} onPress={() => handlePress('تخاطب لاسلكي', 'walkietalkie')}>
            <MaterialCommunityIcons name="walkie-talkie" size={40} color="#fff" />
            <Text style={styles.cardText}>تخاطب لاسلكي</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.card, { backgroundColor: '#4361ee' }]} onPress={() => handlePress('محادثات فورية', 'chat')}>
            <MaterialCommunityIcons name="chat-processing" size={40} color="#fff" />
            <Text style={styles.cardText}>محادثات فورية</Text>
          </TouchableOpacity>
        </View>

        {/* الزر الخامس السفلي */}
        <View style={styles.singleRow}>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#f77f00' }]} onPress={() => handlePress('الموسيقى والأصوات', 'music')}>
            <MaterialCommunityIcons name="music" size={40} color="#fff" />
            <Text style={styles.cardText}>موسيقى وأصوات</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* النافذة المنبثقة للبيانات */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{currentType}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={26} color="#fff" />
              </TouchableOpacity>
            </View>

            {loading ? (
              <View style={styles.centerFetch}>
                <ActivityIndicator size="large" color="#4361ee" />
                <Text style={styles.loadingText}>جاري التحميل...</Text>
              </View>
            ) : fetchedData.length > 0 ? (
              <FlatList
                data={fetchedData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            ) : (
              <View style={styles.centerFetch}>
                <Text style={styles.errorText}>لا توجد بيانات متاحة حالياً لهذا القسم.</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b132b', paddingVertical: 20 },
  header: { marginTop: 40, alignItems: 'center', paddingHorizontal: 20 },
  logoText: { fontSize: 36, fontWeight: 'bold', color: '#ffffff', marginBottom: 10 },
  logoHighlight: { color: '#4361ee' },
  subTitle: { fontSize: 18, color: '#4361ee', fontWeight: '600', marginBottom: 5 },
  descText: { fontSize: 13, color: '#a3b1c6', textAlign: 'center' },
  gridContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  row: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  singleRow: { flexDirection: 'row', justifyContent: 'center' },
  card: { width: width * 0.38, height: width * 0.35, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 12, elevation: 5, padding: 10 },
  cardText: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-end' },
  modalContent: { height: '70%', backgroundColor: '#1c2541', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  centerFetch: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#fff', marginTop: 10 },
  errorText: { color: '#a3b1c6', textAlign: 'center' },
  itemCard: { backgroundColor: '#3a506b', padding: 15, borderRadius: 12, marginBottom: 10 },
  itemDetails: { color: '#fff', fontSize: 13, fontFamily: 'monospace' }
});
