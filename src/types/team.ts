import type z from 'zod';
import {teamForm} from "@/validators/team";

export type TeamFormValues = z.infer<typeof teamForm>;