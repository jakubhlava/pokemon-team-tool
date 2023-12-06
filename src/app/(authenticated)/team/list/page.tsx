'use client';

import { Card } from '@/components/Card';
import { TeamCard } from '@/components/TeamCard';

const ListTeamsPage = () => {
	const teams: MockTeam[] = [
		{
			name: 'Team 1',
			pokemon: [1, 2, 3, 4, 5, 6],
			description: 'Tým 1 je nejlepší tým'
		},
		{
			name: 'Team 2',
			pokemon: [7, 8, 9]
		}
	];

	const openCreateModal = () => {
		const modal = document.getElementById('createModal');
		if (modal !== null) {
			(modal as HTMLDialogElement).showModal();
		}
	};

	return (
		<>
			<div className="m-2 flex flex-col gap-8 lg:m-8 lg:flex-row">
				<div className="lg:basis-2/5">
					<Card>
						<h1 className="text-2xl font-semibold text-emerald-900">
							Team preview
						</h1>
						Tady bude detail po rozkliknutí a tak... Asi
					</Card>
				</div>
				<div className="flex flex-col gap-4 lg:basis-3/5">
					<button className="btn btn-secondary" onClick={openCreateModal}>
						<i className="bi bi-plus"></i> Create team
					</button>

					{teams.map(team => (
						<TeamCard team={team} key={team.name}></TeamCard>
					))}
				</div>
			</div>
			<dialog id="createModal" className="modal">
				<div className="modal-box">
					{
						// TODO doplnit Form Handling & validation
					}
					<form action="" className=" flex flex-col gap-4">
						<div className="form-control">
							<label htmlFor="teamName" className="label">
								Enter name of new team
							</label>
							<input
								type="text"
								id="teamName"
								className="input input-bordered w-full"
							/>
						</div>
						<button className="btn btn-primary">
							<i className="bi bi-plus"></i> Create team
						</button>
					</form>
				</div>
			</dialog>
		</>
	);
};

export default ListTeamsPage;
