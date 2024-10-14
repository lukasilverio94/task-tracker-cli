#!/usr/bin/env node
import path from "path";
import { fileURLToPath } from "url";
import fs from "node:fs";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, "tasks.json");

// Read tasks from JSON file
function readTasks() {
  if (!fs.existsSync(FILE_PATH)) {
    return [];
  }

  const data = fs.readFileSync(FILE_PATH, "utf-8");
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

//write tasks to a json file
function writeTasks(tasks) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}

// generate a unique ID
function generateId(tasks) {
  return uuidv4();
}

// add new task
function addTask(description) {
  const tasks = readTasks();
  const newTask = {
    id: generateId(tasks),
    description: description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  writeTasks(tasks);
  console.log(`Task added successfully (ID: ${newTask.id})`);
}

// update task
function updateTask(id, newDescription) {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    console.log(`Task with ID ${id} not found`);
    return;
  }

  task.description = newDescription;
  task.updatedAt = new Date().toISOString();
  writeTasks(tasks);
  console.log(`Task (ID: ${id}) updated successfully`);
}

// delete task
function deleteTask(id) {
  let tasks = readTasks();
  const initialLenght = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);

  if (tasks.length === initialLenght) {
    console.log(`Task with id ${id} not found`);
  }
  // update tasks on json
  writeTasks(tasks);
  console.log(`Task (ID: ${id}) deleted successfully`);
}

// margin in progress
function markInProgress(id) {
  updateTaskStatus(id, "in-progress");
}

// mark task as done
function markDone(id) {
  updateTaskStatus(id, "done");
}

// Update Task Status (done or in progress)
function updateTaskStatus(id, status) {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    console.log(`Task with (ID: ${id}) not found`);
    return;
  }

  task.status = status;
  task.updatedAt = new Date().toISOString();
  writeTasks(tasks);
  console.log(`Task (ID: ${id}) marked as ${status}.`);
}

// List Tasks
function listTasks(filter = null) {
  const tasks = readTasks();
  let filteredTasks = tasks;

  if (filter === "done") {
    filteredTasks = tasks.filter((t) => t.status === "done");
  } else if (filter === "todo") {
    filteredTasks = tasks.filter((t) => t.status === "todo");
  } else if (filter === "in-progress") {
    filteredTasks = tasks.filter((t) => t.status === "in-progress");
  }

  if (filteredTasks.length === 0) {
    console.log("No tasks found");
  } else {
    filteredTasks.forEach((task) => {
      console.log(
        `[${task.id}] ${task.description} - ${task.status} (Created: ${task.createdAt})`
      );
    });
  }
}

// switch cases
const [, , command, ...args] = process.argv;

switch (command) {
  case "add":
    addTask(args.join(" "));
    break;
  case "update":
    updateTask(args[0], args.slice(1).join(" "));
    break;
  case "delete":
    deleteTask(args[0]);
    break;
  case "mark-in-progress":
    markInProgress(args[0]);
    break;
  case "mark-done":
    markDone(args[0]);
    break;
  case "list":
    listTasks(args[0]);
    break;
  default:
    console.log(
      "Invalid command. Use add, update, delete, mark-in-progress, mark-done, list."
    );
}
