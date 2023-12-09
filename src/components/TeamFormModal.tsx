'use client';

import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import {Team, TeamFormValues} from '@/types/team';
import { zodResolver } from '@hookform/resolvers/zod';
import { teamForm , teamSchema} from '@/validators/team';
import { Error } from '@/components/Error';
import { useMutation } from '@tanstack/react-query';import {useRouter} from "next/navigation";
import {Spinner} from "@/components/spinner";

const TeamFormModal = () => {
	const modalRef = useRef<HTMLDialogElement>(null);

	const {
		register,
		handleSubmit,
		formState,
		reset
	} = useForm<TeamFormValues>({
		resolver: zodResolver(teamForm)
	});

	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (formData: TeamFormValues) => {
			const res = await fetch('/api/team', {
				method: 'POST',
				body: JSON.stringify(formData)
			});

			return teamSchema.parseAsync(await res.json());
		},
		onSuccess: async (team: Team) => {
			closeCreateModal();
			router.push('/team/' + team.id)
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

	const closeCreateModalEvent = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();

		closeCreateModal();
	};

	const closeCreateModal = () => {
		if (modalRef.current !== null) {
			modalRef.current.close();
		}

		reset();
	};

	return (
		<>
			<button className="btn btn-secondary" onClick={openCreateModal}>
				<i className="bi bi-plus" /> Create team
			</button>

			<dialog ref={modalRef} id="createModal" className="modal">
				<div className="modal-box">
					<form
						action=""
						className="flex flex-col gap-4"
						onSubmit={handleSubmit(onSubmit)}
					>
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
							{formState.errors.name && <Error>{formState.errors.name?.message}</Error>}
							<label htmlFor="teamDescritpion" className="label">
								Enter description of new team
							</label>
							<textarea
								id="teamDescritpion"
								className="input input-bordered h-16 w-full"
								{...register('description')}
							></textarea>
							{formState.errors.description && (
								<Error>{formState.errors.description?.message}</Error>
							)}
						</div>
						{formState.isSubmitting ? <Spinner /> : <button className="btn btn-primary rounded-2xl">
							<i className="bi bi-plus"></i> Create team
						</button>}
						<button
							className="absolute right-2 top-0 m-2 text-2xl"
							onClick={closeCreateModalEvent}
						>
							&times;
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

export default TeamFormModal;
