export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce interface naming convention: I{ComponentName}Props',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
    messages: {
      incorrectNamingInterface:
        'Interface "{{name}}" must follow the naming convention: I{{baseName}}Props',
    },
  },

  create(context) {
    return {
      TSInterfaceDeclaration(node) {
        const interfaceName = node.id.name;

        // Pattern: Phải bắt đầu bằng "I", theo sau là chữ cái viết hoa, và kết thúc bằng "Props"
        const propsPattern = /^I[A-Z][a-zA-Z0-9]*Props$/;

        if (!propsPattern.test(interfaceName)) {
          // Tự động tạo tên gợi ý đúng format
          let suggestedName = interfaceName;
          let baseName = interfaceName;

          // Trường hợp 1: Có "Props" nhưng thiếu "I" ở đầu
          // VD: MainAppProps -> IMainAppProps
          if (
            interfaceName.endsWith('Props') &&
            !interfaceName.startsWith('I')
          ) {
            suggestedName = `I${interfaceName}`;
            baseName = interfaceName.replace(/Props$/, '');
          }
          // Trường hợp 2: Có "I" nhưng thiếu "Props"
          // VD: IMainApp -> IMainAppProps
          else if (
            interfaceName.startsWith('I') &&
            !interfaceName.endsWith('Props')
          ) {
            suggestedName = `${interfaceName}Props`;
            baseName = interfaceName.replace(/^I/, '');
          }
          // Trường hợp 3: Thiếu cả "I" và "Props"
          // VD: MainApp -> IMainAppProps
          else if (
            !interfaceName.startsWith('I') &&
            !interfaceName.endsWith('Props')
          ) {
            suggestedName = `I${interfaceName}Props`;
            baseName = interfaceName;
          }
          // Trường hợp 4: Có cả "I" và "Props" nhưng sai format (vd: chữ thường sau I)
          // VD: ImainAppProps -> IMainAppProps
          else {
            baseName = interfaceName.replace(/^I/, '').replace(/Props$/, '');

            // Đảm bảo chữ cái đầu tiên sau "I" là viết hoa
            if (baseName.length > 0) {
              baseName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
            }

            suggestedName = `I${baseName}Props`;
          }

          context.report({
            node: node.id,
            messageId: 'incorrectNamingInterface',
            data: {
              name: interfaceName,
              baseName: baseName || interfaceName,
            },
            fix(fixer) {
              return fixer.replaceText(node.id, suggestedName);
            },
          });
        }
      },
    };
  },
};
