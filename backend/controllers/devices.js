module.exports.logDevices = (req, res) => {
  const allDevices = req.body.devices

  try {

    const nameAndIdExist = allDevices.every((device) => device.name && device.id)
    console.log('Here is the list of devices available for BLE connection:');
    allDevices.forEach(device => {
      if (nameAndIdExist) {
        console.log('name:', device.name, ',', 'id:', device.id, '- device is available for BLE connection');
      }
      else {
        throw Error('One or more devices dont have a name')
      }
    });

    res
      .status(200)
      .send(allDevices)

  } catch (error) {
    console.log(error.message);
    res
      .status(403)
      .send({
        error: error.message
      })
  }

}
