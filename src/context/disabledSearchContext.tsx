import {
	createContext,
	useContext,
	type Dispatch,
	type SetStateAction,
	useState,
	type PropsWithChildren
} from 'react';

type DisabledSearchState = [boolean, Dispatch<SetStateAction<boolean>>];

const DisabledSearchContext = createContext<DisabledSearchState>(
	undefined as never
);

export const DisabledSearchContextProvider = ({
	children
}: PropsWithChildren) => {
	const state = useState<boolean>(false);
	return (
		<DisabledSearchContext.Provider value={state}>
			{children}
		</DisabledSearchContext.Provider>
	);
};

export const useDisabledSearchState = () => useContext(DisabledSearchContext);
