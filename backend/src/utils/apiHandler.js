// backend/src/utils/apiHandler.js
exports.handleApiRequest = (serviceFunction) => async (req, res) => {
  try {
    const result = await serviceFunction(req.body, req, req.params);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during API request:", error);
    return res.status(500).json({ message: error.message });
  }
};
