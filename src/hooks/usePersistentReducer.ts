type UsePersitentReducerProps<S, A> = {
    key: string;
    reducer: (state: S, action: A) => S;
    initialState: S;
};

import { useReducer, useEffect } from "react";

const usePersistentReducer = <S, A>({
    key,
    reducer,
    initialState,
}: UsePersitentReducerProps<S, A>): [S, React.Dispatch<A>] => {
    // Initialize state from localStorage or use the provided initialState
    const initialValue = () => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialState;
        } catch (error) {
            // Handle potential errors (e.g., if localStorage is unavailable)
            console.error("Error reading from localStorage:", error);
            return initialState;
        }
    };

    // Use the useReducer hook with the retrieved initial value
    const [state, dispatch] = useReducer(reducer, initialState, initialValue);

    // Use useEffect to persist the state to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            // Handle potential errors (e.g., quota exceeded)
            console.error("Error writing to localStorage:", error);
        }
    }, [key, state]); // Dependencies: re-run effect if 'key' or 'state' changes

    return [state, dispatch];
};

export default usePersistentReducer;
