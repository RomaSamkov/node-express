const { Router } = require("express");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const usersPath = path.join(__dirname, "/../db/users.json");

const router = Router();

const getUsersList = async () => {
  return JSON.parse(await fs.readFile(usersPath));
};

const writeUsers = async (users) => {
  return await fs.writeFile(usersPath, JSON.stringify(users));
};

router.get("/users", async (req, res) => {
  try {
    const users = await getUsersList();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const users = await getUsersList();
    const user = users.find((user) => String(user.id) === id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/users", async (req, res) => {
  try {
    const body = req.body;
    const users = await getUsersList();
    const user = { id: uuidv4(), ...body };
    users.push(user);
    await writeUsers(users);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const users = await getUsersList();
    const index = users.findIndex((user) => String(user.id) === id);
    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = { ...users[index], ...body };
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const users = await getUsersList();
    const filteredUsers = users.filter((user) => String(user.id) !== id);
    if (filteredUsers.length === users.length) {
      return res.status(404).json({ message: "User not found" });
    }
    await writeUsers(filteredUsers);
    res.status(200).json({ message: "User was removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
