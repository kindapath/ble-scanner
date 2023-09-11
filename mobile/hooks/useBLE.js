import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";

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



  // request permissions
  const requestPermissions = async () => {

    // request fine location permission
    const bluetoothFineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Fine Location permission",
        message: "App requires Fine Location",
        buttonPositive: "OK"
      }
    )

    return (
      bluetoothFineLocationPermission === PermissionsAndroid.RESULTS.GRANTED
    )
  }

  // checking for duplicates
  const isDuplicateDevice = (devices, nextDevice) => {

    // returns index of the first element in the array that passes the test. Otherwise, -1.
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

    // if ble is off
    if (!bleOn) {
      // enable BLE
      await bleManager.enable()
    }

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
              name: device.name || 'Unknown device',
              id: device.id || 'Unknown ID'
            }]
          }
          return prevState
        })

      }
    })


    // in 10 secs after scan start
    setTimeout(() => {
      // stop scanning
      bleManager.stopDeviceScan()

      setIsScanning(false)

      // send request to the server
      sendDevices(allDevices)
        .then(res => {
          console.log('request sent successfully:', res)
        })
        .catch((err) => console.log(err))
    }, 10000);
  }

  return {
    scanForPeripherals,
    requestPermissions,
    allDevices,
    isScanning
  }
}


export default useBLE;
