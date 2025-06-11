const userService = require("../services/userService");
const { handleApiRequest } = require("../utils/apiHandler");

exports.registerOrLogin = handleApiRequest(async (body) => {
  const { username } = body;
  return await userService.registerOrLogin(username);
});
