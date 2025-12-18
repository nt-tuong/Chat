export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce interface naming convention: T{ComponentName}',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
    messages: {
      incorrectNamingType:
        'Type "{{name}}" must follow the naming convention: T{{baseName}}',
    },
  },

  create(context) {
    return {
      TSTypeAliasDeclaration(node) {
        const typeName = node.id.name;

        // Pattern: Phải bắt đầu bằng "T", theo sau là chữ cái viết hoa, và kết thúc bằng "Props"
        const propsPattern = /^T[A-Z][a-zA-Z0-9]*$/;

        if (!propsPattern.test(typeName)) {
          // Tự động tạo tên gợi ý đúng format
          let suggestedName = typeName;
          let baseName = typeName;

          // Trường hợp 1: Thiếu "T" ở đầu
          // VD: MainApp -> TMainApp
          if (!typeName.startsWith('T')) {
            suggestedName = `T${typeName}`;
            baseName = typeName.replace(/Props$/, '');
          }
          // Trường hợp 2: Có cả "T" nhưng sai format (vd: chữ thường sau T)
          // VD: TmainApp -> TMainApp
          else {
            baseName = typeName.replace(/^T/, '');

            // Đảm bảo chữ cái đầu tiên sau "T" là viết hoa
            if (baseName.length > 0) {
              baseName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
            }

            suggestedName = `T${baseName}`;
          }

          context.report({
            node: node.id,
            messageId: 'incorrectNamingType',
            data: {
              name: typeName,
              baseName: baseName || typeName,
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
