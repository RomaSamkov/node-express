const { Router } = require("express");
const fs = require("fs/promises");
const path = require("path");

const usersPath = path.join(__dirname, "/../db/users.json");

const router = Router();

const getUsersList = async () => {
  return JSON.parse(await fs.readFile(usersPath));
};

router.get("/users", async (req, res) => {
  try {
    const users = await getUsersList();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
