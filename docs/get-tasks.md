import { createSupbaseClient } from "@/supabase/client";

# `/api/get-tasks` Endpoint Documentation

## Overview

The `/api/get-tasks` endpoint allows you to fetch task data from the database. It supports both paginated and non-paginated responses and can filter tasks based on the `created_by` or `assigned_to` fields.

## Request

### Method

`POST`

### Headers

- `Content-Type: application/json`

### Body Parameters

- `paginated` (boolean, optional): If `true`, the response will be paginated.
- `page` (integer, optional): The page number to fetch when pagination is enabled. Defaults to `1`.
- `items_per_page` (integer, optional): The number of items per page when pagination is enabled. Defaults to `10`.
- `created_by` (string, optional): The UUID of the user who created the tasks. Only one type of filter (`created_by` or `assigned_to`) can be used at a time.
- `assigned_to` (string, optional): The UUID of the user to whom the tasks are assigned. Only one type of filter (`created_by` or `assigned_to`) can be used at a time.

## Response

### Successful Response (Non-Paginated)

```json
{
  "message": "fetched task data!",
  "data": {
    "tasks": [
      {
        "id": "8175a03e-4490-4d49-9c52-79366443c62d",
        "title": "update title for the testing",
        "description": "wanna dance with you",
        "status": "completed",
        "priority": "high",
        "assigned_to": "01c5c849-087a-41c9-b693-6ac816cbb3b2",
        "created_by": "a2666ab2-9263-4f23-b494-912faa305056",
        "due_date": "2024-10-18T00:00:00",
        "metadata": {
          "name": "Maruf bodda",
          "age": 25,
          "isDeveloper": true
        },
        "n8n_data": {
          "name": "Jeesan ulu",
          "age": 25,
          "isDeveloper": true
        },
        "completion_date": "2024-10-19T00:00:00"
      },
      {
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
    ]
  }
}
```

### Successful Response (Paginated)

```json
{
  "message": "fetched task data!",
  "data": {
    "tasks": [
      {
        "id": "8175a03e-4490-4d49-9c52-79366443c62d",
        "title": "update title for the testing",
        "description": "wanna dance with you",
        "status": "completed",
        "priority": "high",
        "assigned_to": "01c5c849-087a-41c9-b693-6ac816cbb3b2",
        "created_by": "a2666ab2-9263-4f23-b494-912faa305056",
        "due_date": "2024-10-18T00:00:00",
        "metadata": {
          "name": "Maruf bodda",
          "age": 25,
          "isDeveloper": true
        },
        "n8n_data": {
          "name": "Jeesan ulu",
          "age": 25,
          "isDeveloper": true
        },
        "completion_date": "2024-10-19T00:00:00"
      },
      {
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
      },
      {
        "id": "203e2597-8137-459d-82b6-2cf1147fd9a2",
        "title": "update json",
        "description": "update metadata ",
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
    ],
    "page": 1,
    "items_per_page": 5,
    "max_pages": 1
  }
}
```

## Filtering

### By `created_by`

To filter tasks by the user who created them, include the `created_by` field in the request body with the UUID of the user.

### By `assigned_to`

To filter tasks by the user to whom they are assigned, include the `assigned_to` field in the request body with the UUID of the user.

### No Filtering

To fetch all tasks without any filtering, omit both the `created_by` and `assigned_to` fields from the request body.

**Note:** Only one type of filter (`created_by` or `assigned_to`) can be used at a time.

## Examples

### Non-Paginated Request Filtering by `created_by`

```json
{
  "created_by": "a2666ab2-9263-4f23-b494-912faa305056"
}
```

### Paginated Request Without Filtering

```json
{
  "paginated": true,
  "page": 1,
  "items_per_page": 5
}
```

### Paginated Request Filtering by `assigned_to`

```json
{
  "paginated": true,
  "page": 1,
  "items_per_page": 5,
  "assigned_to": "01c5c849-087a-41c9-b693-6ac816cbb3b2"
}
```
