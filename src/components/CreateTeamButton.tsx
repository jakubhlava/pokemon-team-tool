'use client';

export const CreateTeamButton = () => {
	const openCreateModal = () => {
		const modal = document.getElementById('createModal');
		if (modal !== null) {
			(modal as HTMLDialogElement).showModal();
		}
	};

	return (
		<>
			<button className="btn btn-secondary" onClick={openCreateModal}>
				<i className="bi bi-plus"></i> Create team
			</button>
			<dialog id="createModal" className="modal">
				<div className="modal-box">
					{
						// TODO doplnit Form Handling & validation
					}
					<form method="dialog">
						<button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
							✕
						</button>
					</form>
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
						<button className="btn btn-primary rounded-2xl">
							<i className="bi bi-plus"></i> Create team
						</button>
					</form>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
};
