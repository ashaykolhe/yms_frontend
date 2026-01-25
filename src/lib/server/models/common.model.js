const mongoose = require("mongoose");

const CommonSchema = new mongoose.Schema(
  {
    backgroundVisualsPrompt: {
      type: String,
    },
    backgroundVisualsVisuals: {
      type: String,
    },
    themePrompt: {
      type: String,
    },
    speechToTextOutput: {
      type: String,
    },
    srt: {
      type: String,
    },
    metadata: {
      type: String,
    },
    softDelete: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
  { _id: false },
);

// const Common = mongoose.model("Common", CommonSchema, "common");

// module.exports = Long;
module.exports = CommonSchema;
