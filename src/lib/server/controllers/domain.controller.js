const Domain = require("../models/domain.model");

const getDomains = async (req, res) => {
  try {
    const domains = await Domain.find({});
    return res.status(200).json(domains);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createDomain = async (req, res) => {
  try {
    // const domains = await Domain.find({});
    // if (domains.length === 0) {
    //   const domain = await Domain.create(req.body.status);
    //   return res.status(200).json(domain);
    // } else {
    //   if(req.body.append){

    //   }
    //   let statusArray = domains[0].status;
    //   statusArray.push(...req.body.status);
    //   let uniqueStatus = new Set(statusArray);
    //   const deleted = await Domain.deleteMany({});
    //   console.log(`Successfully deleted ${deleted.deletedCount} documents.`);
    //   const domain = await Domain.create(req.body);
    //   console.log(domain);
    //   return res.status(200).json(domain);
    // }

    const deleted = await Domain.deleteMany({});
    console.debug(`Successfully deleted ${deleted.deletedCount} documents.`);
    const domain = await Domain.create(req.body);
    return res.status(200).json(domain);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loadDefaultDomain = async (req, res) => {
  try {
    const deleted = await Domain.deleteMany({});
    console.debug(`Successfully deleted ${deleted.deletedCount} documents.`);
    const status = {
      status: ["PHILOSOPHY", "EMOTION", "MYTHOLOGY", "FOLKLORE", "SCIENCE"],
    };
    const domain = await Domain.create(status);
    return res.status(200).json(domain);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDomains,
  createDomain,
  loadDefaultDomain,
};
