import { useEffect, useRef, useState } from "react"

type AsyncValue<T> = {
    state: "fulfilled";
    value: T;
} | {
    state: "pending";
} | {
    state: "rejected";
    error: any;
};

/**
 * Returns an object representing the current state of the given promise
 */
function usePromiseAsyncValue<T>(prom: PromiseLike<T>): AsyncValue<T> {
    const [state, setState] = useState<AsyncValue<T>>({
        state: "pending"
    })

    const lastProm = useRef<PromiseLike<T> | null>(prom);

    useEffect(() => {
        lastProm.current = prom;
        prom
            .then(result => ({
                state: "fulfilled" as const,
                value: result
            }), error => ({
                state: "rejected" as const,
                error
            }))
            .then(result => {
                if (lastProm.current != prom)
                    return;

                setState(result);
            });

        return () => {
            // Cancel subscription
            lastProm.current = null;
        }
    }, [prom])
    return state;
}

/**
 * Returns the promise result or undefined if the promise is not fulfilled yet.
 * Throws if the promise is rejected.
 */
export function usePromise<T>(promise: PromiseLike<T>): T | undefined {
    const value = usePromiseAsyncValue(promise);
    if (value.state == "fulfilled")
        return value.value;
    if (value.state == "rejected")
        throw value.error;

    return undefined;
}