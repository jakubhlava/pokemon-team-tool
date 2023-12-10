'use client';

import React, { useState } from 'react';

import TeamFormModal from '@/components/TeamFormModal';

const TeamCreateButton = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<button className="btn btn-secondary" onClick={openModal}>
				<i className="bi bi-plus" /> Create team
			</button>

			<TeamFormModal isOpen={isModalOpen} onClose={closeModal} />
		</>
	);
};

export default TeamCreateButton;
