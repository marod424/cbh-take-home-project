# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The main goal of the refactor was to make the code more readable.  
This was accomplished by moving branch logic into two separate functions, particularly one to get the candidate from the event (`getCandidateFromEvent`) and one to handle the candidate length (`handleCandidateLength`).  
Both functions are pure functions, in that they do not create side effects and return values.  
I used the nullish coalescing operator and the ternary operator to also make the logic more concise.