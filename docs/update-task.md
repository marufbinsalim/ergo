# API Documentation: `/api/update-task`

## Endpoint

`POST /api/update-task`

## Description

This endpoint allows you to update a task in the database. You can update multiple fields or a single field of a task.

## Request Body

The request body should be a JSON object containing the following fields:

- `task_id` (string, required): The ID of the task to be updated.
- `updatable_rows` (object, required): An object containing the fields to be updated. Most of the fields are optional.

### `updatable_rows` Fields

- `title` (string, optional): The title of the task.
- `description` (string, optional): The description of the task.
- `status` (string, optional): The status of the task.
- `priority` (string, optional): The priority of the task.
- `assigned_to` (string, optional): The ID of the user to whom the task is assigned.
- `due_date` (string, optional): The due date of the task in ISO 8601 format.
- `completion_date` (string, optional): The completion date of the task in ISO 8601 format.
- `metadata` (object, optional): A JSON object containing additional metadata.
- `n8n_data` (object, optional): A JSON object containing n8n data.

## Responses

### Success

- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "message": "Task updated successfully",
    "data": {
      "id": "203e2597-8137-459d-82b6-2cf1147fd9a2",
      "title": "update json",
      "description": "update metadata",
      "status": "in_progress",
      "priority": "low",
      "assigned_to": "01c5c849-087a-41c9-b693-6ac816cbb3b2",
      "created_by": "927fde72-33c4-4bc9-8047-d75cd7df21b2",
      "due_date": "2024-10-04T00:00:00",
      "metadata": {
        "name": "Maruf",
        "age": 25,
        "isDeveloper": true
      },
      "n8n_data": {
        "name": "Jeesan",
        "age": 25,
        "isDeveloper": true
      },
      "completion_date": "2024-10-10T00:00:00"
    }
  }
  ```

### Errors

#### Missing Required Fields

- **Status Code**: `400 Bad Request`
- **Response Body**:
  ```json
  {
    "message": "Missing required fields"
  }
  ```

#### Method Not Allowed

- **Status Code**: `405 Method Not Allowed`
- **Response Body**:
  ```json
  {
    "message": "Method POST Not Allowed"
  }
  ```

#### Internal Server Error

- **Status Code**: `500 Internal Server Error`
- **Response Body**:
  ```json
  {
    "message": "Failed to update task",
    "error": "Error message here"
  }
  ```

## Example of a Successful Request Response

```json
{
  "task_id": "203e2597-8137-459d-82b6-2cf1147fd9a2",
  "updatable_rows": {
    "title": "update json",
    "description": "update metadata",
    "status": "in_progress",
    "priority": "low",
    "assigned_to": "01c5c849-087a-41c9-b693-6ac816cbb3b2",
    "due_date": "2024-10-04T00:00:00",
    "metadata": {
      "name": "Maruf",
      "age": 25,
      "isDeveloper": true
    },
    "n8n_data": {
      "name": "Jeesan",
      "age": 25,
      "isDeveloper": true
    },
    "completion_date": "2024-10-10T00:00:00"
  }
}
```
