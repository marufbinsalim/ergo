import { useState } from "react";

function GetTasksTester() {
  const [paginated, setPaginated] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [createdBy, setCreatedBy] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetTasks = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setData(null);
    setError("");

    try {
      const response = await fetch("/api/get-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paginated,
          page,
          items_per_page: itemsPerPage,
          created_by: createdBy || null,
          assigned_to: assignedTo || null,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "An error occurred");
      }
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Test: /api/get-tasks Endpoint</h1>
      <form
        onSubmit={handleGetTasks}
        className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Paginated:
          </label>
          <input
            type="checkbox"
            checked={paginated}
            onChange={(e) => setPaginated(e.target.checked)}
            className="mr-2 leading-tight"
          />
        </div>
        {paginated && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Page:
              </label>
              <input
                type="number"
                value={page}
                onChange={(e) => setPage(Number(e.target.value))}
                min="1"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Items Per Page:
              </label>
              <input
                type="number"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                min="1"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Created By:
          </label>
          <input
            type="text"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Assigned To:
          </label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          {loading ? "Fetching Tasks..." : "Get Tasks"}
        </button>
      </form>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 w-full max-w-[90vw]">
          <h2 className="font-bold">Error</h2>
          <pre>{error}</pre>
        </div>
      )}
      {data && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 w-full max-w-[90vw]">
          <h2 className="font-bold">Result from API</h2>
          <pre className="whitespace-pre-wrap break-all">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export { GetTasksTester };
