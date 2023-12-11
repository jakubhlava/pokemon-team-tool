'use client';

import React, { useState } from 'react';

import TeamFormModal from '@/components/TeamFormModal';
import { type Team } from '@/types/team';

type TeamEditButtonProps = {
	team: Team;
};

const TeamEditButton = ({ team }: TeamEditButtonProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<button className="btn btn-circle btn-ghost btn-sm" onClick={openModal}>
				<i className="bi bi-pencil" />
			</button>

			<TeamFormModal isOpen={isModalOpen} onClose={closeModal} team={team} />
		</>
	);
};

export default TeamEditButton;
