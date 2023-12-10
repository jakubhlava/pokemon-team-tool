'use client';

import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ConfirmDialog } from '@/components/ConfirmDialog';

type TeamDeleteButtonProps = {
	teamId: string;
};

export const TeamDeleteButton = (props: TeamDeleteButtonProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (teamId: string) => {
			await fetch(`/api/team/${teamId}`, {
				method: 'DELETE'
			});
		}
	});

	const handleDelete = async () => {
		await mutation.mutateAsync(props.teamId);

		closeDialog();
		router.refresh();
	};

	const openDialog = () => {
		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
	};

	const closeDialog = () => {
		if (dialogRef.current) {
			dialogRef.current.close();
		}
	};

	return (
		<>
			<button
				className="flex h-full w-full items-center justify-center text-white"
				onClick={openDialog}
			>
				<i className="bi bi-trash" />
			</button>

			<ConfirmDialog
				message="Are you sure do you want to delete this team?"
				successCallback={handleDelete}
				cancelCallback={closeDialog}
				ref={dialogRef}
				isLoading={mutation.isPending || mutation.isSuccess}
			/>
		</>
	);
};
