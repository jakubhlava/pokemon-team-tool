import React, { forwardRef } from 'react';

import { Spinner } from '@/components/spinner';

type ConfirmDialogProps = {
	successCallback: () => void;
	cancelCallback?: () => void;
	message: string;
	isLoading: boolean;
};

export const ConfirmDialog = forwardRef<HTMLDialogElement, ConfirmDialogProps>(
	({ successCallback, cancelCallback, message, isLoading }, ref) => (
		<dialog ref={ref} className="modal">
			<div className="modal-box p-6">
				<h2 className="mb-4 text-2xl font-semibold text-gray-900">
					Confirmation
				</h2>
				<p className="mb-6">{message}</p>
				<div className="flex justify-end space-x-4">
					{isLoading ? (
						<Spinner />
					) : (
						<>
							<button
								onClick={cancelCallback}
								className="rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								No
							</button>
							<button
								onClick={successCallback}
								className="rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
							>
								Yes
							</button>
						</>
					)}
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	)
);

ConfirmDialog.displayName = 'ConfirmDialog';
