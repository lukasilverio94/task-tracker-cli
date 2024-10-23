# Project URL:

https://roadmap.sh/projects/task-tracker

# How run this project

- First run `npm install` on the root of this project
- run on terminal:
  `node index.js` and some of the following commands:

# Adding a new task

node index.js add "Buy groceries"

# Output: Task added successfully (ID: 1)

# Updating and deleting tasks

node index.js update 1 "Buy groceries and cook dinner"
node index.js delete 1

# Marking a task as in progress or done

node index.js mark-in-progress 1
node index.js mark-done 1

# Listing all tasks

node index.js list

# Listing tasks by status

node index.js list done
node index.js list todo
node index.js list in-progress
