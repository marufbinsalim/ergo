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

  const paginated = req.body.paginated;
  const isPaginated = paginated ? paginated === true : false;
  const page = req.body.page ? parseInt(req.body.page) : 1;
  const items_per_page = req.body.items_per_page
    ? parseInt(req.body.items_per_page)
    : 10;

  const created_by = req.body.created_by;
  const assigned_to = req.body.assigned_to;

  const supabase = await createSupbaseClient();

  if (isPaginated) {
    let countQuery = supabase
      .from("tasks")
      .select("id", { count: "exact", head: true });

    if (created_by) {
      countQuery.eq("created_by", created_by);
    } else if (assigned_to) {
      countQuery.eq("assigned_to", assigned_to);
    }

    const { count, error: countError } = await countQuery;

    if (countError || !count) {
      return res.status(400).json({ message: countError });
    }

    const max_pages = Math.ceil(count / items_per_page);

    if (page > max_pages) {
      return res.status(400).json({
        message: `Page ${page} does not exist. Max pages: ${max_pages}`,
      });
    }

    let start = (page - 1) * items_per_page;
    let end = start + items_per_page - 1;

    console.log("count", count);
    console.log("start", start);
    console.log("end", end);

    const paginatedQuery = supabase.from("tasks").select("*").range(start, end);

    if (created_by) {
      paginatedQuery.eq("created_by", created_by);
    } else if (assigned_to) {
      paginatedQuery.eq("assigned_to", assigned_to);
    }

    const { data, error } = await paginatedQuery;

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json({
      message: "fetched task data!",
      data: {
        tasks: data,
        page: page,
        items_per_page: items_per_page,
        max_pages: max_pages,
      },
    });
  }

  const query = supabase.from("tasks").select("*");

  if (created_by) {
    query.eq("created_by", created_by);
  } else if (assigned_to) {
    query.eq("assigned_to", assigned_to);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return res.status(200).json({
    message: "fetched task data!",
    data: {
      tasks: data,
    },
  });
}
