# usePromise

The smallest package to use promises in React.

`usePromise.ts` is only 60 lines of dependency free Typescript code.

- Ultra simple to use:
```ts
    import { usePromise } from "usePromise";
    // Promise result, undefined when loading, throws on promise rejection
    const result = usePromise(myPromise);
```

- Compatible both with ES6 and CommonJS modules

- `useMemoAsync` helper for calling async functions:
```ts
    // Exact same syntax and behaviour as useMemo, but for promises
    const customer = useMemoAsync(() => fetchCustomer(id), [id]);
```

- Compatible with multiple major React versions:
```json
 //package.json
 "dependencies": {
    "react": ">=16"
  },
```

## No bloat oath
> I do solemnly swear to never bloat this package
>
> <cite>Rafael Salguero</cite>