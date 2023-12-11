import Swal from 'sweetalert2';

export const ToastSuccess = Swal.mixin({
	toast: true,
	position: 'bottom-right',
	iconColor: 'white',
	color: 'white',
	background: '#21a978',
	customClass: {
		popup: 'colored-toast'
	},
	showConfirmButton: false,
	timer: 1500,
	timerProgressBar: true
});
