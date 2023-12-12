'use client';

import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { type Team, type TeamFormValues } from '@/types/team';
import { teamForm, teamSchema } from '@/validators/team';
import { Error as ErrorElem } from '@/components/Error';
import { Spinner } from '@/components/spinner';
import { ToastSuccess } from '@/toasts/Success';
import { ToastError } from '@/toasts/Error';
import { ToastWarning } from '@/toasts/Warning';

const errorHandle = (e: Error) => {
	if (e.message.startsWith('4')) {
		ToastWarning.fire({
			title: e.message,
			icon: 'warning'
		});
	}
	if (e.message.startsWith('5')) {
		ToastError.fire({
			title: e.message,
			icon: 'error'
		});
	}
};

type TeamFormModalProps = {
	isOpen: boolean;
	onClose: () => void;
	team?: Team;
};

const TeamFormModal = ({ isOpen, onClose, team }: TeamFormModalProps) => {
	const modalRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (isOpen) {
			modalRef.current?.showModal();
		} else {
			modalRef.current?.close();
		}
	}, [isOpen]);

	const defaultValues = team
		? { name: team.name, description: team.description }
		: { name: '', description: '' };

	const { register, handleSubmit, formState, reset } = useForm<TeamFormValues>({
		resolver: zodResolver(teamForm),
		defaultValues
	});

	const router = useRouter();

	const mutationCreate = useMutation({
		mutationFn: async (formData: TeamFormValues) => {
			const res = await fetch('/api/team', {
				method: 'POST',
				body: JSON.stringify(formData)
			});

			if (!res.ok) {
				throw new Error(`${res.status} ${res.statusText}`);
			}

			return teamSchema.parseAsync(await res.json());
		},
		onSuccess: async (team: Team) => {
			closeModal();
			router.push(`/team/${team.id}`);
		},
		onError: async (e: Error) => {
			closeModal();
			reset();
			errorHandle(e);
		}
	});

	const mutationUpdate = useMutation({
		mutationFn: async (formData: TeamFormValues) => {
			const teamId = team?.id;

			const res = await fetch(`/api/team`, {
				method: 'PUT',
				body: JSON.stringify({ id: teamId, ...formData })
			});

			if (!res.ok) {
				throw new Error(`${res.status} ${res.statusText}`);
			}

			return teamSchema.parseAsync(await res.json());
		},
		onSuccess: async (team: Team) => {
			ToastSuccess.fire({
				title: 'Team updated successfully!',
				icon: 'success'
			});
			closeModal();
			reset({ name: team.name, description: team.description });
			router.refresh();
		},
		onError: async (e: Error) => {
			closeModal();
			reset();
			errorHandle(e);
		}
	});

	const onSubmit = async (data: TeamFormValues) => {
		if (team) {
			await mutationUpdate.mutateAsync(data);
		} else {
			await mutationCreate.mutateAsync(data);
		}
	};

	const closeCreateModalEvent = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		closeModal();
	};

	const closeModal = () => {
		onClose();
	};

	return (
		<dialog
			ref={modalRef}
			id="createModal"
			className="modal"
			onClose={closeModal}
		>
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
						{formState.errors.name && (
							<ErrorElem>{formState.errors.name?.message}</ErrorElem>
						)}
						<label htmlFor="teamDescritpion" className="label">
							Enter description of new team
						</label>
						<textarea
							id="teamDescritpion"
							className="input input-bordered h-16 w-full"
							{...register('description')}
						/>
						{formState.errors.description && (
							<ErrorElem>{formState.errors.description?.message}</ErrorElem>
						)}
					</div>
					{formState.isSubmitting ? (
						<Spinner />
					) : (
						<button className="btn btn-primary rounded-2xl">
							{team ? (
								<>
									<i className="bi bi-plus" /> Save team
								</>
							) : (
								<>
									<i className="bi bi-plus" /> Create team
								</>
							)}
						</button>
					)}
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
	);
};

export default TeamFormModal;
