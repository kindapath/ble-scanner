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

import useBLE from './useBLE';

export default function App() {

  const {
    requestPermissions,
    scanForPeripherals,
    allDevices
  } = useBLE()

  const scanForDevices = async () => {
    console.log('scanning...');
    const isPermissionsEnabeled = await requestPermissions()
    if (isPermissionsEnabeled) {
      scanForPeripherals()
    }
  }

  return (
    <View style={styles.mainBody}>
      <View>
        <Text style={styles.headerTitle}>
          React Native BLE Manager Tutorial
        </Text>
      </View>

      <Text>{allDevices}</Text>

      <TouchableOpacity activeOpacity={0.5} style={styles.buttonStyle} onPress={scanForDevices} >
        <Text style={styles.buttonTextStyle}>Scan Bluetooth Devices </Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  headerTitle: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 24
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    height: windowHeight,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
