import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface UseStatePromiseFn {
    <T>(initialState: T | (() => T)): readonly [
        T,
        (value: SetStateAction<T>) => Promise<T>,
        Dispatch<SetStateAction<T>>
    ];
    <T = undefined>(): readonly [
        T | undefined,
        (value: SetStateAction<T | undefined>) => Promise<T | undefined>,
        Dispatch<SetStateAction<T | undefined>>
    ];
}

export const useStatePromise: UseStatePromiseFn = <T>(initialState?: T) => {
    const [state, setState] = useState(initialState);

    const setStatePromise = useCallback((value: T & ((prevState: T | undefined) => T)) => {
        if (typeof value === 'function') {
            return new Promise((resolve) => {
                setState((prevState: T | undefined) => {
                    const nextValue = value(prevState);
                    resolve(nextValue);
                    return nextValue;
                });
            });
        } else {
            return new Promise((resolve) => {
                setState(() => {
                    resolve(value);
                    return value;
                });
            });
        }
    }, []);

    return [state, setStatePromise, setState] as const;
};

export default useStatePromise;
