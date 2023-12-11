'use client';

import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ConfirmDialog } from '@/components/ConfirmDialog';
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

type TeamDeleteButtonProps = {
	teamId: string;
};

export const TeamDeleteButton = (props: TeamDeleteButtonProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (teamId: string) => {
			const res = await fetch(`/api/team/${teamId}`, {
				method: 'DELETE'
			});

			if (!res.ok) {
				throw new Error(`${res.status} ${res.statusText}`);
			}
		},
		onSuccess: () => {
			ToastSuccess.fire({
				title: 'Team deleted',
				icon: 'success'
			});
		},
		onError: (e: Error) => {
			closeDialog();
			errorHandle(e);
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
