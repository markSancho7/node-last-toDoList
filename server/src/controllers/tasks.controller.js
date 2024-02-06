const TaskModel = require('../models/task.model');

const taskController = {};

taskController.getAllTasks = async (req, res) => {
  try {
    const allTasks = await TaskModel.find();
    return res.status(200).send(allTasks);
  } catch {
    return res.status(500).send({ error: 'error reading dataBase' });
  }
};
taskController.updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  console.log(completed);
  try {
    await TaskModel.updateOne({ _id: id }, { $set: { completed } });
    const allTasks = await TaskModel.find();
    return res.status(200).send(allTasks);
  } catch (error) {
    return res.status(500).send({ error: 'error updating data' + error });
  }
};

taskController.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await TaskModel.deleteOne({ _id: id });
    const allTasks = await TaskModel.find();
    return res.status(200).send(allTasks);
  } catch (error) {
    return res.status(500).send({ error: 'error deleting data' + error });
  }
};

taskController.createTask = async (req, res) => {
  const { task, completed } = req.body;
  try {
    const newTask = new TaskModel({ task, completed });
    await newTask.save();
    const allTasks = await TaskModel.find();
    return res.status(200).send(allTasks);
  } catch (error) {
    return res.status(500).send({ error: 'error creating data' + error });
  }
};
module.exports = taskController;
