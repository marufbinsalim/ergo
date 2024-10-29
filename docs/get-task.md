# Get User API Endpoint

This API endpoint retrieves task information from the database based on the provided task ID.

## Endpoint

`POST /api/get-task`

## Request

### Headers

- `Content-Type: application/json`

### Body

- `task_id` (string, required): The ID of the task to be fetched.

### Example Request

```json
POST /api/get-task
Content-Type: application/json

{
    "task_id": "fbd45e9f-3a31-4b94-9f44-21dba1a14d7f"
}
```

## Response

### Success

- **Status Code:** `200 OK`

- **Response Body:**
  ```json
  {
    "message": "Task found",
    "data": {
      "id": "fbd45e9f-3a31-4b94-9f44-21dba1a14d7f",
      "title": "look!",
      "description": "hello world",
      "status": "pending",
      "priority": "high",
      "assigned_to": "a2666ab2-9263-4f23-b494-912faa305056",
      "created_by": "a2666ab2-9263-4f23-b494-912faa305056",
      "due_date": "2024-10-30T02:39:00",
      "metadata": {
        "xd": true
      },
      "n8n_data": {
        "hello": true
      },
      "completion_date": null
    }
  }
  ```

### Errors

- **Status Code:** `400 Bad Request`

  - When the request body is missing.
  - **Response Body:**

    ```json
    {
      "error": "Missing request body",
      "data": null
    }
    ```

  - When `task_id` is missing in the request body.
  - **Response Body:**

    ```json
    {
      "message": "task_id is required"
    }
    ```

  - When the task is not found in the database.
  - **Response Body:**

    ```json
    {
      "Error": "PGRST116 : JSON object requested, multiple (or no) rows returned"
    }
    ```
