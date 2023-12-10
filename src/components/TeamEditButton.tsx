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
			<button className="btn btn-primary" onClick={openModal}>
				Edit
			</button>

			<TeamFormModal isOpen={isModalOpen} onClose={closeModal} team={team} />
		</>
	);
};

export default TeamEditButton;
