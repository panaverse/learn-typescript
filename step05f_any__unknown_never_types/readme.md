# Any and Unknown Types

[Any Type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any)

[What is the “unknown” Type in TypeScript?](https://javascript.plainenglish.io/what-is-the-unknown-type-in-typescript-5ef6c5333b81)

Never Type

The never type represents the type of values that never occur. For instance, never is the return type for a function expression or an arrow function expression that always throws an exception or one that never returns. Variables also acquire the type never when narrowed by any type guards that can never be true.

The never type is a subtype of, and assignable to, every type; however, no type is a subtype of, or assignable to, never (except never itself). Even any isn’t assignable to never.