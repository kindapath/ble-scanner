import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Text,
  View,
  Platform,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  NativeModules,
  useColorScheme,
  TouchableOpacity,
  NativeEventEmitter,
  PermissionsAndroid,
  FlatList,
} from 'react-native';


import useBLE from './hooks/useBLE';

export default function App() {

  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    isScanning
  } = useBLE()

  const scanForDevices = async () => {

    const isPermissionsEnabeled = await requestPermissions()
    console.log(isPermissionsEnabeled);
    if (isPermissionsEnabeled) {
      console.log('scanning...');
      scanForPeripherals()
    }
  }

  return (
    <View style={styles.mainBody}>
      <StatusBar style="auto" />
      <View>
        <Text style={styles.headerTitle}>
          Bluetooth Scanner
        </Text>
      </View>

      <ScrollView style={styles.deviceList}>
        {allDevices.map(({ name, id }) => (
          <View style={styles.item} key={id}>
            <Text style={styles.itemTitle}>name: {name}</Text>
            <Text style={styles.itemTitle}>id: {id}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity activeOpacity={0.5} style={styles.buttonStyle} onPress={scanForDevices} >
        <Text style={styles.buttonTextStyle}>{isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}</Text>
      </TouchableOpacity>

    </View>
  );
}
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  headerTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 24
  },
  deviceList: {
    padding: 0,
    margin: 0,
    width: '100%',
  },
  item: {
    backgroundColor: '#0F4C75',
    padding: 5,
    marginVertical: 8,
    width: '100%',
    borderRadius: 10,
  },
  itemTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    padding: 5
  },
  mainBody: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    height: windowHeight,
    padding: 10,
    paddingTop: 35,
    backgroundColor: '#1B262C'
  },
  buttonStyle: {
    position: 'absolute',
    bottom: 5,
    backgroundColor: '#3282B8',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#3282B8',
    height: 40,
    width: '100%',
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 20,

  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
