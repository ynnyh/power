module.exports = {
    'extends': 'standard',
    // 解析器选项
    'parserOptions': {
        'ecmaVersion': 6,  // 支持ecma6
        'sourceType': 'module',  // 默认是script
        'ecmaFeatures': {
            'jsx': true,  // 支持jsx
            'impliedStrict': true  //全局使用严格模式
        }
    },
    // 语言环境, 定义全局变量
    'env': {
        'browser': true,  // browser全局变量
        'node': true,     // node全局变量
        'commonjs': true, // commonjs全局变量
        'meteor': true,   // meteor全局变量
        'mongo': true,
        'jquery': true,
        'amd': true
    },
    // 全局变量
    'globals': {},
    // 第三方插件
    'plugins': [
        'standard',
        'promise'
    ],
    // 语法规则，off或0表示不检查这个规则，warn或1表示开启规则作为提醒，error或2表示开启规则作为错误
    'rules': {
        // Possible Errors, 常见错误
        'comma-dangle': [2, 'never'],       // 要求或禁止末尾逗号
        'no-cond-assign': [2],              // 禁止条件表达式中出现赋值操作符
        'no-constant-condition': [2],       // 禁止在条件中使用常量表达式
        'no-control-regex': [2],            // 禁止在正则表达式中使用控制字符
        'no-debugger': [2],                 // 禁用 debugger
        'no-dupe-args': [2],                // 禁止 function 定义中出现重名参数
        'no-dupe-keys': [2],                // 禁止对象字面量中出现重复的 key
        'no-duplicate-case': [2],           // 禁止出现重复的 case 标签
        'no-empty-character-class': [2],    // 禁止在正则表达式中使用空字符集
        'no-empty': [2],                    // 禁止出现空语句块
        'no-ex-assign': [2],                // 禁止对 catch 子句的参数重新赋值
        'no-extra-boolean-cast': [2],       // 禁止不必要的布尔转换
        'no-func-assign': [2],              // 禁止对 function 声明重新赋值
        'no-inner-declarations': [2],       // 禁止在嵌套的块中出现变量声明或 function 声明
        'no-invalid-regexp': [2],           // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
        'no-irregular-whitespace': [2],     // 禁止在字符串和注释之外不规则的空白
        'no-negated-in-lhs': [2],
        'no-obj-calls': [2],                // 禁止把全局对象作为函数调用
        'no-regex-spaces': [2],             // 禁止正则表达式字面量中出现多个空格
        'no-sparse-arrays': [2],            // 禁用稀疏数组
        'no-unexpected-multiline': [2],     // 禁止出现令人困惑的多行表达式
        'no-unreachable': [2],              // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
        'use-isnan': [2],                   // 要求使用 isNaN() 检查 NaN

        // Best Practices, 最佳实践
        'no-case-declarations':[2],         // 不允许在 case 子句中使用词法声明
        'no-empty-pattern': [2],            // 禁止使用空解构模式
        'no-octal': [2],                    // 禁用八进制字面量
        'no-fallthrough': [2],              // 禁止 case 语句落空
        'no-redeclare': [2],                // 禁止多次声明同一变量
        'no-self-assign':[2],               // 禁止自我赋值
        'no-unused-labels': [1],            // 禁用出现未使用过的标
        'no-multi-spaces': [1],             // 禁止使用多个空格
        'no-void': [2],                     // 禁用 void 操作符

        // Variables, 变量相关
        'no-delete-var': [2],               // 禁止删除变量
        'no-undef': [2],                    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        'no-unused-vars': [1],              // 禁止出现未使用过的变量
        'no-label-var': [2],                // 不允许标签与变量同名
        'no-shadow-restricted-names': [2],  //禁止覆盖受限制的标识符

        // Stylistic Issues, 代码风格
        'semi': [2, 'always'],              // 要求或禁止使用分号而不是 ASI
        'quotes': [2, 'single'],            // 强制在 JSX 属性中一致地使用双引号或单引号
        'strict': [2, 'safe'],              // 要求或禁止使用严格模式指令
        'dot-location': [2, 'property'],    // 强制在点号之前和之后一致的换行
        'init-declarations': [2, 'always'], // 要求或禁止 var 声明中的初始化
        "func-style": [2, "expression", { "allowArrowFunctions": true }],

        // ECMAScript 6
        'no-catch-shadow': [2],             // 禁止 catch 子句的参数与外层作用域中的变量同名
        'constructor-super': [1],           // 要求在构造函数中有 super() 的调用
        'no-const-assign': [2],             // 禁止修改 const 声明的变量
        'no-dupe-class-members': [2],       // 禁止类成员中出现重复的名称
        'no-new-symbol': [2],               // disallow new operators with the Symbol object
        'no-this-before-super': [2],        // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
        'no-class-assign': [2]              // 禁止修改类声明的变量
    }
}