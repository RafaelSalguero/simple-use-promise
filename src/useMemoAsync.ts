import { DependencyList, useMemo } from "react";
import { usePromise } from "./usePromise";

/**
 * Recomputes @param func when @param deps change.
 * Returns the result of @param func, or undefined if the promise is not fulfilled yet.
 * Throws if func promise is rejected.
 */
export function useMemoAsync<T>(func: () => PromiseLike<T>, deps: DependencyList) {
    return usePromise(useMemo(func, deps));
}