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
    const isPermissionsEnabeled = await requestPermissions()
    console.log(isPermissionsEnabeled);
    if (isPermissionsEnabeled) {
      console.log('scanning...');
      scanForPeripherals()
    }
  }

  return (
    <View style={styles.mainBody}>
      <View>
        <Text style={styles.headerTitle}>
          React Native BLE Manager
        </Text>
      </View>

      {/* <FlatList
        data={allDevices}
        renderItem={({ name }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{name}</Text>
          </View>
        )}
        keyExtractor={device => device.id}
      /> */}

      <TouchableOpacity activeOpacity={0.5} style={styles.buttonStyle} onPress={scanForDevices} >
        <Text style={styles.buttonTextStyle}>Scan Bluetooth Devices</Text>
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemTitle: {
    fontSize: 32,
  },
  mainBody: {
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight,
  },
  buttonStyle: {
    position: 'absolute',
    bottom: 5,
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    width: '100%',
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
