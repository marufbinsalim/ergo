import { FormEvent, useState } from "react";

export default function UpdateTaskTester() {
  const [taskData, setTaskData] = useState({
    task_id: "",
    title: "",
    description: "",
    status: "" as "pending" | "in_progress" | "completed" | "",
    priority: "" as "low" | "medium" | "high" | "",
    assigned_to: "",
    due_date: "",
    completion_date: "",
    metadata: "",
    n8n_data: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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

    const metadataJson = taskData.metadata ? JSON.parse(taskData.metadata) : {};
    const n8nDataJson = taskData.n8n_data ? JSON.parse(taskData.n8n_data) : {};

    let updatable_rows: any = {};

    if (taskData.title && taskData.title !== "") {
      updatable_rows.title = taskData.title;
    }

    if (taskData.description && taskData.description !== "") {
      updatable_rows.description = taskData.description;
    }

    if (taskData.status !== "") {
      updatable_rows.status = taskData.status;
    }

    if (taskData.priority !== "") {
      updatable_rows.priority = taskData.priority;
    }

    if (taskData.assigned_to && taskData.assigned_to !== "") {
      updatable_rows.assigned_to = taskData.assigned_to;
    }

    if (taskData.due_date && taskData.due_date !== "") {
      updatable_rows.due_date = taskData.due_date;
    }

    if (taskData.completion_date && taskData.completion_date !== "") {
      updatable_rows.completion_date = taskData.completion_date;
    }

    if (Object.keys(metadataJson).length > 0) {
      updatable_rows.metadata = metadataJson;
    }

    if (Object.keys(n8nDataJson).length > 0) {
      updatable_rows.n8n_data = n8nDataJson;
    }

    const response = await fetch("/api/update-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_id: taskData.task_id,
        updatable_rows: updatable_rows,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Error updating task");
    } else {
      setMessage("Task updated successfully");
      setData(result); // Save the updated task data
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Test: /api/update-task Endpoint
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Task ID:
          </label>
          <input
            type="text"
            name="task_id"
            value={taskData.task_id}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
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
            <option value="">Select</option>
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
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Assigned To:
          </label>
          <input
            type="text"
            name="assigned_to"
            value={taskData.assigned_to}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Due Date:
          </label>
          <input
            type="date"
            name="due_date"
            value={taskData.due_date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Completion Date:
          </label>
          <input
            type="date"
            name="completion_date"
            value={taskData.completion_date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Metadata:
          </label>
          <textarea
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
          <textarea
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
          {isSubmitting ? "Submitting..." : "Update Task"}
        </button>
      </form>

      {isSubmitting && <p className="text-gray-600">Loading...</p>}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 w-full max-w-[90vw]">
          <h2 className="font-bold">Error</h2>
          <pre>{error}</pre>
        </div>
      )}
      {data && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 w-full max-w-[90vw]">
          <h2 className="font-bold">Updated Task Data</h2>
          <pre className="whitespace-pre-wrap break-all">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
