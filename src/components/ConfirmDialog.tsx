import React, {forwardRef} from "react";
import {Spinner} from "@/components/spinner";

type ConfirmDialogProps = {
	successCallback: () => void;
	cancelCallback?: () => void;
	message: string;
	isLoading: boolean;
};

export const ConfirmDialog = forwardRef<HTMLDialogElement, ConfirmDialogProps>(
	({ successCallback, cancelCallback, message, isLoading }, ref) => {
		return (
			<dialog ref={ref} className="modal">
				<div className="modal-box p-6">
					<h2 className="text-2xl font-semibold text-gray-900 mb-4">Confirmation</h2>
					<p className="mb-6">{message}</p>
					<div className="flex justify-end space-x-4">
						{isLoading ? (
							<Spinner />
							) : (
								<>
									<button
										onClick={cancelCallback}
										className="px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										No
									</button>
									<button
										onClick={successCallback}
										className="px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
		);
	}
);

ConfirmDialog.displayName = 'ConfirmDialog';