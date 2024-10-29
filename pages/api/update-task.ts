import { createSupbaseClient } from "@/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res:NextApiResponse
) {
    if (req.method === 'POST') {
        const { task_id, updatable_rows } = req.body;
        if (!task_id || !updatable_rows) {
            return res.status(400).json({ message: "Missing require fields" });
        }

        console.log(updatable_rows)

        const supabase = await createSupbaseClient();

        const { data, error } = await supabase
            .from("tasks")
            .update(updatable_rows)
            .eq("id", task_id)
            .select("*")
            .single()
        
        if (error) {
            console.error("Supabase error: ", error);
        }

        if (error) {
            console.error("Supabase error:", error);
            return res
                .status(500)
                .json({ message: "Failed to update task", error: error.message });
        }
        res.status(200).json({ message: "Task updated successfully", data });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
