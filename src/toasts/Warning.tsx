import Swal from 'sweetalert2';

export const ToastWarning = Swal.mixin({
	toast: true,
	position: 'bottom-right',
	iconColor: 'white',
	color: 'white',
	background: 'orange',
	customClass: {
		popup: 'colored-toast'
	},
	showConfirmButton: false,
	timer: 1500,
	timerProgressBar: true
});
