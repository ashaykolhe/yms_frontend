const VideoStatus = require("../models/videoStatus.model");

const getVideoStatuss = async (req, res) => {
  try {
    console.log("getVideoStatuss");
    const videoStatuss = await VideoStatus.find({});
    return res.status(200).json(videoStatuss);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createVideoStatus = async (req, res) => {
  try {
    // const videoStatuss = await VideoStatus.find({});
    // if (videoStatuss.length === 0) {
    //   const videoStatus = await VideoStatus.create(req.body.status);
    //   return res.status(200).json(videoStatus);
    // } else {
    //   if(req.body.append){

    //   }
    //   let statusArray = videoStatuss[0].status;
    //   statusArray.push(...req.body.status);
    //   let uniqueStatus = new Set(statusArray);
    //   const deleted = await VideoStatus.deleteMany({});
    //   console.log(`Successfully deleted ${deleted.deletedCount} documents.`);
    //   const videoStatus = await VideoStatus.create(req.body);
    //   console.log(videoStatus);
    //   return res.status(200).json(videoStatus);
    // }

    const deleted = await VideoStatus.deleteMany({});
    console.debug(`Successfully deleted ${deleted.deletedCount} documents.`);
    const videoStatus = await VideoStatus.create(req.body);
    return res.status(200).json(videoStatus);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loadDefaultVideoStatus = async (req, res) => {
  try {
    const deleted = await VideoStatus.deleteMany({});
    console.debug(`Successfully deleted ${deleted.deletedCount} documents.`);
    const status = {
      status: [
        "NEXT",
        "AUDIO",
        "SRT",
        "BACKGROUND VISUALS",
        "DOWNLOAD VIDEO",
        "PREMIERE PRO",
        "PREMIERE PRO SHORT",
        "READY",
        "UPLOADING",
        "METADATA PENDING",
        "UPLOADED",
        "PUBLISHED",
      ],
    };
    const videoStatus = await VideoStatus.create(status);
    return res.status(200).json(videoStatus);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getVideoStatuss,
  createVideoStatus,
  loadDefaultVideoStatus,
};
