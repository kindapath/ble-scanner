import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";

import * as ExpoDevice from "expo-device"

import {
  BleManager
} from "react-native-ble-plx";

function useBLE() {
  const bleManager = new BleManager()
  const [allDevices, setAllDevices] = useState([])

  const requestPermissions = async () => {
    console.log('request');
    // const bluetoothScanPermission = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    //   {
    //     title: "Scan permission",
    //     message: "App requires Bluetooth Scanning",
    //     buttonPositive: "OK"
    //   }
    // )

    // const bluetoothConnectPermission = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    //   {
    //     title: "Fine Location permission",
    //     message: "App requires Fine Location",
    //     buttonPositive: "OK"
    //   }
    // )

    const bluetoothFineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Fine Location permission",
        message: "App requires Fine Location",
        buttonPositive: "OK"
      }
    )

    console.log('location:', bluetoothFineLocationPermission);
    // console.log('scan:', bluetoothScanPermission);
    // console.log('connect:', bluetoothConnectPermission);

    return (
      // bluetoothScanPermission === 'granted' &&
      // bluetoothConnectPermission === 'granted' &&
      // bluetoothFineLocationPermission === 'granted'
      // bluetoothScanPermission === PermissionsAndroid.RESULTS.GRANTED &&
      // bluetoothConnectPermission === PermissionsAndroid.RESULTS.GRANTED &&
      bluetoothFineLocationPermission === PermissionsAndroid.RESULTS.GRANTED
    )
  }

  const isDuplicateDevice = (devices, nextDevice) => {
    devices.findIndex((device) => nextDevice.id === device.id) > -1
  }

  const scanForPeripherals = () => {
    console.log('start');
    bleManager.startDeviceScan(null, null, (err, device) => {
      if (err) {
        console.log('error while scanning:');
      }
      if (device) {

        setAllDevices((prevState) => {
          if (!isDuplicateDevice(prevState, device)) {
            console.log('name:', device.name, 'id:', device.id);
            return [...prevState, {
              name: device.name,
              id: device.id
            }]
          }
        })

      }
    })

    setTimeout(() => {
      bleManager.stopDeviceScan()

      console.log('stop scanning...');
    }, 5000);
  }

  return {
    scanForPeripherals,
    requestPermissions,
    allDevices
  }
}


export default useBLE;
