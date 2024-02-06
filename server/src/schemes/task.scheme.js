const mongoose = require('mongoose');

const TaskScheme = mongoose.Schema(
  {
    task: { type: String, required: true },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'tasks',
  }
);
module.exports = TaskScheme;
