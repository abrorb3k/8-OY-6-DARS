import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const TodoApp = () => {
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>(
    []
  );
  const [taskText, setTaskText] = useState("");
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTasks(
          response.data.slice(0, 10).map((task: any) => ({
            text: task.title,
            completed: task.completed,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const addTask = () => {
    if (taskText.trim() === "") return;
    setTasks([...tasks, { text: taskText, completed: false }]);
    setTaskText("");
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="bg-gray-900 mx-auto">
      <div className="max-w-md mx-auto py-10">
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-bold text-center">To-do App</h2>

            <Input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Add a task"
            />

            <Button onClick={addTask} className="w-full cursor-pointer">
              Add Task
            </Button>

            <div className="mt-4 space-y-2">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(index)}
                  />
                  <span
                    className={`ml-2 ${task.completed ? "line-through" : ""}`}
                  >
                    {task.text}
                  </span>
                  <Button
                    onClick={() => removeTask(index)}
                    className="ml-2 text-red-500 cursor-pointer"
                  >
                    🗑️
                  </Button>
                </div>
              ))}
            </div>

            {quote && (
              <div className="mt-4 text-center text-lg font-medium italic">
                <p>"{quote}"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TodoApp;
