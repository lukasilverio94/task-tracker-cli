# How run this project

- First run `npm install` on the root of this project
- run on terminal:
  `node index.js` and some of the following commands:

# Adding a new task

task-cli add "Buy groceries"

# Output: Task added successfully (ID: 1)

# Updating and deleting tasks

task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done

task-cli mark-in-progress 1
task-cli mark-done 1

# Listing all tasks

task-cli list

# Listing tasks by status

task-cli list done
task-cli list todo
task-cli list in-progress
