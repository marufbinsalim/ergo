# API Route Handler Documentation: Create a New Task

## Endpoint

`/api/add-task`

## Description

This API route handler processes POST requests to create a new task in the Supabase database.

## Request Body Fields

- **title**: The title of the task (required)
- **description**: A detailed description of the task (optional)
- **status**: The current status of the task (required)
- **priority**: The priority level of the task (required)
- **assigned_to**: The user ID to whom the task is assigned (required)
- **created_by**: The user ID who created the task (required)
- **due_date**: The due date for the task (optional)
- **metadata**: Additional metadata related to the task (optional)
- **n8n_data**: Data related to n8n workflows (optional)

## Response Codes

- **400**: If any of the required fields are missing.
- **201**: If the task is successfully created. The response includes the created task data.
- **500**: If there is an error during the task creation. The response includes an error message.
- **405**: If the request method is not POST.

## Parameters

- **req**: The incoming request object (`NextApiRequest`).
- **res**: The outgoing response object (`NextApiResponse`).

## Example Request

### Input

```json
{
  "title": "New Task",
  "description": "This is a new task",
  "status": "open",
  "priority": "high",
  "assigned_to": "0b7b4b7b-4b7b-4b7b-4b7b-4b7b4b7b4b7b",
  "created_by": "0e8b3b7b-4b7b-4b7b-4b7b-4b7b4b7b4b7b",
  "due_date": "2023-12-31",
  "metadata": {
    "project": "Project A"
  },
  "n8n_data": {
    "workflow_id": "wf789"
  }
}
```

### Output

#### Success (201)

```json
{
  "id": "task789",
  "title": "New Task",
  "description": "This is a new task",
  "status": "open",
  "priority": "high",
  "assigned_to": "0b7b4b7b-4b7b-4b7b-4b7b-4b7b4b7b4b7b",
  "created_by": "0e8b3b7b-4b7b-4b7b-4b7b-4b7b4b7b4b7b",
  "due_date": "2023-12-31",
  "metadata": {
    "project": "Project A"
  },
  "n8n_data": {
    "workflow_id": "wf789"
  },
  "created_at": "2023-10-01T12:00:00Z"
}
```

#### Error (400)

```json
{
  "error": "Missing required fields: title, status, priority, assigned_to, created_by"
}
```

#### Error (500)

```json
{
  "error": "Internal Server Error"
}
```
