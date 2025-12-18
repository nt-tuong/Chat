export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow console statements except console.error and console.warn inside catch blocks or inside debug mode wrappers',
      category: 'Possible Errors',
      recommended: false,
    },
    schema: [],
    messages: {
      unexpectedConsole:
        'Unexpected console statement outside of catch block or debug mode ({{method}}).',
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        // --- Step 1: catch only console.xxx ---
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object?.name === 'console'
        ) {
          const method = node.callee.property?.name;

          // --- Case 2: Allow console.error and console.warn inside a catch blocks ---
          if (method === 'error' || method === 'warn') {
            let parent = node.parent;
            while (parent) {
              if (parent.type === 'CatchClause') return; // → Allow
              parent = parent.parent;
            }
          }

          // --- Step 3: Allow console if it is inside 「debugLog」 function ---
          let currentScope = context.getScope();
          while (currentScope) {
            const func = currentScope.block;
            if (
              func.type === 'FunctionDeclaration' &&
              func.id?.name === 'debugLog'
            ) {
              return; // Allow inside debugLog
            }
            currentScope = currentScope.upper;
          }

          // --- Step 4: If it is not inside a catch blocks or debugLog → report error ---
          context.report({
            node,
            messageId: 'unexpectedConsole',
            data: { method },
          });
        }
      },
    };
  },
};
