import { FormEvent, useState } from "react";

export default function AddTaskForm() {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "pending" as "pending" | "in_progress" | "completed",
    priority: "low" as "low" | "medium" | "high",
    assigned_to: "",
    created_by: "",
    due_date: "",
    metadata: "",
    n8n_data: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...taskData,
          metadata: JSON.parse(taskData.metadata),
          n8n_data: JSON.parse(taskData.n8n_data),
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error creating task");
      }

      console.log("Task created:", result);

      setMessage(JSON.stringify(result, null, 2));
      setTaskData({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        assigned_to: "",
        created_by: "",
        due_date: "",
        metadata: "",
        n8n_data: "",
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <input
            type="text"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status:
          </label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Priority:
          </label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Assigned To (User ID):
          </label>
          <input
            type="text"
            name="assigned_to"
            value={taskData.assigned_to}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Created By (User ID):
          </label>
          <input
            type="text"
            name="created_by"
            value={taskData.created_by}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Due Date:
          </label>
          <input
            type="datetime-local"
            name="due_date"
            value={taskData.due_date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Metadata:
          </label>
          <input
            type="text"
            name="metadata"
            value={taskData.metadata}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            n8n Data:
          </label>
          <input
            type="text"
            name="n8n_data"
            value={taskData.n8n_data}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          {isSubmitting ? "Submitting..." : "Add Task"}
        </button>
      </form>

      {isSubmitting && <p className="text-gray-600">Submitting...</p>}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 w-full max-w-[90vw]">
          <h2 className="font-bold">Error</h2>
          <pre>{error}</pre>
        </div>
      )}
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 w-full max-w-[90vw]">
          <h2 className="font-bold">Success</h2>
          <pre className="whitespace-pre-wrap break-all">{message}</pre>
        </div>
      )}
    </div>
  );
}
