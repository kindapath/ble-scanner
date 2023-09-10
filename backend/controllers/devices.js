module.exports.logDevices = (req, res) => {
  try {
    const allDevices = req.body.devices

    const namesExist = allDevices.every((device) => device.name)
    allDevices.forEach(device => {
      if (namesExist) {
        console.log(device.name, '- device is available for BLE connection');
        res
          .status(200)
          .send(allDevices)
      }
      else {
        throw Error('One or more devices dont have a name')
      }
    });

  } catch (error) {
    console.log(error.message);
    res
      .send({
        error: error.message
      })
      .status(500)
  }

}
