import type z from 'zod';
import {teamForm, teamSchema} from "@/validators/team";

export type TeamFormValues = z.infer<typeof teamForm>;

export type Team = z.infer<typeof teamSchema>