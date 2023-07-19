import { z } from "zod";

export const apiBodySchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      email: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      avatar: z.string(),
    })
  ),
  page: z.number(),
  per_page: z.number(),
  total: z.number(),
  total_pages: z.number(),
});
