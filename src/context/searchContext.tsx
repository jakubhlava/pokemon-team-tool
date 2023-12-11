import {
	createContext,
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
	useContext,
	useState
} from 'react';

type SearchState = [string, Dispatch<SetStateAction<string>>];

const SearchContext = createContext<SearchState>(undefined as never);

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
	const state = useState<string>('');
	return (
		<SearchContext.Provider value={state}>{children}</SearchContext.Provider>
	);
};

export const useSearchState = () => useContext(SearchContext);
