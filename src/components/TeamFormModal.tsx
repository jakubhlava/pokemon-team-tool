'use client'

import React, {useRef} from 'react';
import { useForm } from 'react-hook-form';
import { TeamFormValues } from "@/types/team";
import { zodResolver } from '@hookform/resolvers/zod';
import {teamForm} from "@/validators/team";
import {Error} from "@/components/Error";
import {useMutation} from "@tanstack/react-query";


const TeamFormModal = () => {
	const modalRef = useRef<HTMLDialogElement>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<TeamFormValues>({
		resolver: zodResolver(teamForm),
	});

	const mutation = useMutation({
		mutationFn: async (formData: TeamFormValues) => {
			const res = await fetch('/api/team', {
				method: 'POST',
				body: JSON.stringify(formData)
			});

			return await res.json();
		},
		onSuccess: async () => {
			closeCreateModal();
		}
	});

	const onSubmit = async (data: TeamFormValues) => {
		await mutation.mutateAsync(data);
	};

	const openCreateModal = () => {
		if (modalRef.current !== null) {
			modalRef.current.showModal();
		}
	};

	const closeCreateModalEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		closeCreateModal();
	};

	const closeCreateModal = () => {
		if (modalRef.current !== null) {
			modalRef.current.close();
		}

		reset();
	}

	return (
		<>
			<button className="btn btn-secondary" onClick={openCreateModal}>
				<i className="bi bi-plus" /> Create team
			</button>

			<dialog ref={modalRef} id="createModal" className="modal">
				<div className="modal-box">
					<form action="" className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
						<div className="form-control">
							<label htmlFor="teamName" className="label">
								Enter name of new team*
							</label>
							<input
								type="text"
								id="teamName"
								className="input input-bordered w-full"
								{...register('name')}
							/>
							{errors.name && <Error>{errors.name?.message}</Error>}
							<label htmlFor="teamDescritpion" className="label">
								Enter description of new team
							</label>
							<textarea
								id="teamDescritpion"
								className="input input-bordered w-full h-16"
								{...register('description')}
							>
							</textarea>
							{errors.description && <Error>{errors.description?.message}</Error>}
						</div>
						<button className="btn btn-primary rounded-2xl">
							<i className="bi bi-plus"></i> Create team
						</button>
						<button className="absolute top-0 right-2 m-2 text-2xl" onClick={closeCreateModalEvent}>&times;</button>
					</form>
				</div>
			</dialog>
		</>
	)
}

export default TeamFormModal