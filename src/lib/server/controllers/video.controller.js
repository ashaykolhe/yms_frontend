const Video = require("../models/video.model");
const VideoVersionHistory = require("../models/videoVersionHistory.model");

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.status(200).json(videos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    return res.status(200).json(video);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createVideo = async (req, res) => {
  try {
    req.body.userCreatedBy = req.loggedInUser.email;
    req.body.userUpdatedBy = req.loggedInUser.email;
    const video = await Video.create(req.body);
    const temp = req.body;
    temp["parentVideoId"] = video._id;
    VideoVersionHistory.create(temp);
    return res.status(200).json(video);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateVideo = async (req, res) => {
  try {
    req.body.userCreatedBy = req.loggedInUser.email;
    req.body.userUpdatedBy = req.loggedInUser.email;
    const { id } = req.params;

    let video = await Video.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    let newVideo = { ...video._doc };
    newVideo["parentVideoId"] = newVideo._id;
    delete newVideo._id;
    VideoVersionHistory.create(newVideo);
    return res
      .status(200)
      .json({ message: "Video updated successfully", video: video._doc });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteVideos = async (req, res) => {
  try {
    const { ids } = req.params;
    const idsArray = ids.split(",");
    // const video = await Video.findByIdAndDelete(id);
    const result = await Video.deleteMany({
      _id: { $in: idsArray },
    });

    // if (!video) {
    //   return res.status(404).json({ message: "Video not found" });
    // }

    res
      .status(200)
      .json({ message: result.deletedCount + " Videos deleted permanently" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const softDeleteVideos = async (req, res) => {
  try {
    const { ids } = req.params;
    const idsArray = ids.split(",");
    // const video = await Video.findByIdAndUpdate(id, {
    //   $set: { softDelete: true },
    // });

    // if (!video) {
    //   return res.status(404).json({ message: "Video not found" });
    // }

    const result = await Video.updateMany(
      {
        _id: { $in: idsArray },
        softDelete: false,
      },
      { $set: { softDelete: true } },
    );

    return res.status(200).json({
      message:
        "Matched : " +
        result.matchedCount +
        " | Modified : " +
        result.modifiedCount +
        " Video deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getVideos,
  getVideo,
  createVideo,
  updateVideo,
  deleteVideos,
  softDeleteVideos,
};
