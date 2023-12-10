import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { ConfirmDialog } from '@/components/ConfirmDialog';

type PokemonDeleteButtonProps = {
	teamPokemonId: string;
};

export const PokemonDeleteButton = ({
	teamPokemonId
}: PokemonDeleteButtonProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (teamPokemonId: string) => {
			await fetch(`/api/team/pokemon/${teamPokemonId}`, {
				method: 'DELETE'
			});
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
