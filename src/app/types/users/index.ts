import { z } from "zod";

import { apiBodySchema } from "../api";

export type UserType = z.infer<typeof apiBodySchema.shape.data.element>;
