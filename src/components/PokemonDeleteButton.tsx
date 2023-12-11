import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { ConfirmDialog } from '@/components/ConfirmDialog';
import { ToastSuccess } from '@/toasts/Success';
import { ToastError } from '@/toasts/Error';
import { ToastWarning } from '@/toasts/Warning';
import { useTeamEditState } from '@/context/teamEditContext';

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

type PokemonDeleteButtonProps = {
	teamPokemonId: string;
};

export const PokemonDeleteButton = ({
	teamPokemonId
}: PokemonDeleteButtonProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [_, setPokemons] = useTeamEditState().state;

	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (teamPokemonId: string) => {
			const res = await fetch(`/api/team/pokemon/${teamPokemonId}`, {
				method: 'DELETE'
			});

			if (!res.ok) {
				throw new Error(`${res.status} ${res.statusText}`);
			}
		},
		onSuccess: () => {
			ToastSuccess.fire({
				title: 'Pokemon deleted',
				icon: 'success'
			});
			setPokemons(pokemons => pokemons.filter(p => p.id !== teamPokemonId));
		},
		onError: (e: Error) => {
			closeDialog();
			errorHandle(e);
		}
	});

	const handleDelete = async () => {
		await mutation.mutateAsync(teamPokemonId);

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
				className="btn btn-circle btn-error btn-sm text-white"
				onClick={openDialog}
			>
				<i className="bi bi-trash" />
			</button>
			<ConfirmDialog
				message="Are you sure do you want to remove this pokemon from team?"
				successCallback={handleDelete}
				cancelCallback={closeDialog}
				ref={dialogRef}
				isLoading={mutation.isPending || mutation.isSuccess}
			/>
		</>
	);
};
