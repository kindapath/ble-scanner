import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [devices, setDevices] = useState([
    { name: 'iphone', id: 1 },
    { name: 'luigi', id: 2 },
    { name: 'shon', id: 3 },
    { name: 'veras', id: 4 },
    { name: 'poki', id: 5 },
    { name: 'uas', id: 6 },
    { name: 'open', id: 7 },
    { name: 'laki', id: 8 },
    { name: 'tor', id: 9 },
    { name: 'pewer', id: 10 },
  ])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BLE Scanner</Text>
      </View>

      <View>
        <Button title='Сканировать' />
      </View>

      <FlatList
        keyExtractor={item => item.id}
        data={devices}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}</Text>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 24
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: '#87CEFA',
    fontSize: 24,
    color: 'white'
  },
});
