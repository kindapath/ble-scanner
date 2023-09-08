import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";

import * as ExpoDevice from "expo-device"

import {
  BleManager
} from "react-native-ble-plx";

function useBLE() {
  const bleManager = new BleManager()
  const [allDevices, setAllDevices] = useState([])

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Scan permission",
        message: "App requires Bluetooth Scanning",
        buttonPositive: "OK"
      }
    )
    const bluetoothFineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Fine Location permission",
        message: "App requires Fine Location",
        buttonPositive: "OK"
      }
    )

    return (
      bluetoothScanPermission === 'granted' &&
      bluetoothFineLocationPermission === 'granted'
    )
  }

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Fine Location permission",
            message: "App requires Fine Location",
            buttonPositive: "OK"
          }
        )
        return granted === PermissionsAndroid.RESULTS.GRANTED
      }
    } else {
      const isAndroid31PermissionGranted = await requestAndroid31Permissions()
      return isAndroid31PermissionGranted
    }
  }

  const scanForPeripherals = () => {
    bleManager.startDeviceScan(null, null, (err, device) => {
      if (err) {
        console.log(err);
      }
      if (device) {
        console.log(device);
        setAllDevices((prevState) => {
          return [...prevState, device]
        })
      }
    })
  }

  return {
    scanForPeripherals,
    requestPermissions,
    allDevices
  }
}


export default useBLE;
