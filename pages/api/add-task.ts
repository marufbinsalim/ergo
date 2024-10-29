import { createSupbaseClient } from "@/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      title,
      description,
      status,
      priority,
      assigned_to,
      created_by,
      due_date,
      metadata,
      n8n_data,
    } = req.body;

    if (!title || !status || !priority || !assigned_to || !created_by) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const supabase = await createSupbaseClient();
    const taskId = uuidv4();

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          id: taskId,
          title,
          description,
          status,
          priority,
          assigned_to,
          created_by,
          due_date,
          metadata,
          n8n_data,
        },
      ])
      .select("*")
      .single();

    if (error) {
      console.error("Supabase error:", error); // Log the error for debugging
      return res
        .status(500)
        .json({ message: "Failed to create task", error: error.message });
    }

    res.status(201).json({ message: "Task created successfully", data });
  }
  res.setHeader("Allow", ["POST"]);
  res.status(405).end("Method ${req.method} Not Allowed");
}
