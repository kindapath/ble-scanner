import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";

import * as ExpoDevice from "expo-device"

import {
  BleManager
} from "react-native-ble-plx";
import useApi from "./useApi";

function useBLE() {
  const bleManager = new BleManager()
  const [allDevices, setAllDevices] = useState([])
  const [isScanning, setIsScanning] = useState(false)

  const {
    sendDevices
  } = useApi()


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
    return devices.findIndex((device) => nextDevice.id === device.id) > -1
  }

  const isBleOn = async () => {

    let bleOn = false

    // check the state of Bluetooth
    const bleState = await bleManager.state()

    if (bleState === 'PoweredOff') {
      bleOn = false
    } else if (bleState === 'PoweredOn') {
      bleOn = true
    }

    return bleOn
  }

  // scan for nearby devices
  const scanForPeripherals = async () => {
    // clean devices list
    setAllDevices([])
    setIsScanning(true)


    // check BlE state
    const bleOn = await isBleOn()
    console.log(bleOn);

    // if ble is off
    if (!bleOn) {
      // enable BLE
      await bleManager.enable()
    }

    console.log('start');

    // start devices scanning
    bleManager.startDeviceScan(null, null, (err, device) => {
      if (err) {
        console.log('error while scanning:');
      }

      // if device is found
      if (device) {

        setAllDevices((prevState) => {

          // and is not duplicate
          if (!isDuplicateDevice(prevState, device)) {

            // add to allDevices state
            return [...prevState, {
              name: device.name || 'Unknown name',
              id: device.id || 'Unknown ID'
            }]
          }
          return prevState
        })

      }
    })



    setTimeout(() => {
      bleManager.stopDeviceScan()
      setIsScanning(false)
      sendDevices(allDevices)
        .then(res => console.log(res))
        .catch((err) => console.log(err))
      // .catch(err => console.log(err))
      console.log('stop scanning...');
      console.log('ad', allDevices);
    }, 15000);
  }

  return {
    scanForPeripherals,
    requestPermissions,
    allDevices,
    isScanning
  }
}


export default useBLE;
