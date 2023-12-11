import Swal from 'sweetalert2';

export const ToastError = Swal.mixin({
	toast: true,
	position: 'bottom-right',
	iconColor: 'white',
	color: 'white',
	background: '#f87171',
	customClass: {
		popup: 'colored-toast'
	},
	showConfirmButton: false,
	timer: 1500,
	timerProgressBar: true
});
