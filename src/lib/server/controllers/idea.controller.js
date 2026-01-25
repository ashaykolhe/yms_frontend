const Idea = require("../models/idea.model");
const IdeaVersionHistory = require("../models/ideaVersionHistory.model");

const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({});
    return res.status(200).json(ideas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const idea = await Idea.findById(id);
    return res.status(200).json(idea);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createIdea = async (req, res) => {
  try {
    req.body.userCreatedBy = req.loggedInUser.email;
    req.body.userUpdatedBy = req.loggedInUser.email;
    const idea = await Idea.create(req.body);
    const temp = req.body;
    temp["parentIdeaId"] = idea._id;
    IdeaVersionHistory.create(temp);
    return res.status(200).json(idea);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateIdea = async (req, res) => {
  try {
    req.body.userUpdatedBy = req.loggedInUser.email;
    const { id } = req.params;
    // delete req.body.userCreatedBy; //TODO remove this code once auth is in place as usercreated and updated will be extracted from jwttoken
    let idea = await Idea.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }
    let newIdea = { ...idea._doc };
    newIdea["parentIdeaId"] = newIdea._id;
    delete newIdea._id;
    IdeaVersionHistory.create(newIdea);
    return res
      .status(200)
      .json({ message: "Idea updated successfully", idea: idea._doc });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteIdeas = async (req, res) => {
  try {
    const { ids } = req.params;
    const idsArray = ids.split(",");
    // const idea = await Idea.findByIdAndDelete(id);
    const result = await Idea.deleteMany({
      _id: { $in: idsArray },
    });

    // if (!idea) {
    //   return res.status(404).json({ message: "Idea not found" });
    // }

    res
      .status(200)
      .json({ message: result.deletedCount + " Ideas deleted permanently" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const softDeleteIdeas = async (req, res) => {
  try {
    const { ids } = req.params;
    const idsArray = ids.split(",");
    // const idea = await Idea.findByIdAndUpdate(id, {
    //   $set: { softDelete: true },
    // });

    // if (!idea) {
    //   return res.status(404).json({ message: "Idea not found" });
    // }

    const result = await Idea.updateMany(
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
        " Idea deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getIdeas,
  getIdea,
  createIdea,
  updateIdea,
  deleteIdeas,
  softDeleteIdeas,
};
