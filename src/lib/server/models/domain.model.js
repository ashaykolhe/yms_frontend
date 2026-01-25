const mongoose = require("mongoose");
const { CommonSchema } = require("./common.model");

const DomainSchema = new mongoose.Schema(
	{
		status: [
			{
				type: String
			}
		]
	},
	{
		timestamps: true
	}
);

const Domain = mongoose.model("Domain", DomainSchema, "domain");

module.exports = Domain;
