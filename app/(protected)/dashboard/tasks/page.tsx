"use client";

import React, { useState } from "react";
import { Task } from "../../../types";
import TasksView from "../../../views/TasksView";
import { MOCK_TASKS } from "../../../constants";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  return <TasksView tasks={tasks} setTasks={setTasks} />;
}

