import { createSupbaseClient } from "@/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;

  if (method === "OPTIONS") {
    return res.status(200).send("ok");
  }

  if (method !== "POST") {
    return res
      .status(405)
      .json({ message: `'${method}' Method Not Allowed - Use 'POST'` });
  }

  if (!req.body) {
    return res.status(400).json({
      error: "Missing request body",
      data: null,
    });
  }

  const id = req.body.task_id;

  if (!id) {
    return res.status(400).json({ message: "task_id is required" });
  }

  const supabase = await createSupbaseClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res
      .status(400)
      .json({ message: `${error.code} : ${error.message}`, data: null });
  }

  res.status(200).json({
    message: "Task found found",
    data: data,
  });
}
