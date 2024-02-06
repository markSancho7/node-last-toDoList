const mongoose = require('mongoose');
const TaskScheme = require('../schemes/task.scheme');

const TaskModel = mongoose.model('Task', TaskScheme);

module.exports = TaskModel;
