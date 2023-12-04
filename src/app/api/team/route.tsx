import {getServerSession} from "next-auth";
import { authOptions } from '@/server/auth';
import {teamCreateSchema} from "@/validators/api";
import {db} from "@/server/db";

export const POST = async (req: Request) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return new Response(JSON.stringify('Unauthorized'), { status: 401 });
	}

	try {
		const user = session.user;

		//TODO if validation fails, return 400 with proper error message
		const data = await teamCreateSchema.parseAsync(await req.json());

		const newTeam = await db.team.create({
			data: {
				...data,
				userId: user.id,
			},
		});

		return new Response(JSON.stringify(newTeam), { status: 201 });

	} catch (e) {
		return new Response(JSON.stringify('Something went wrong.'), { status: 500 });
	}
}