
// logging devices
module.exports.logDevices = (req, res) => {
  const allDevices = req.body.devices

  try {
    // name and id validation
    const nameAndIdExist = allDevices.every((device) => device.name && device.id)

    // logging device list
    if (nameAndIdExist) {
      console.log('Here is the list of devices available for BLE connection:');
      allDevices.forEach(device => {
        console.log('name:', device.name, '—', 'id:', device.id);
      })
    } else {
      // throw an error if validation is not OK
      throw Error('One or more devices dont has no name or ID')
    }
    ;

    res
      .status(200)
      .send(allDevices)

  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .send({
        error: error.message
      })
  }

}
