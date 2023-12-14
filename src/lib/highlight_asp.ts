import highlight from "highlight.js";

export function asp() {
    return {
        case_insensitive: false,
        contains: [
            {
                className: "keyword",
                begin: '#count|#sum[+]?|#min|#max|#show|#const|#edge|#minimize|#maximize|' +
                    '#defined|#heuristic|#project|#program|' +
                    '#external|#theory|#end|not|' +
                    '#script|#include',
                relevance: 10,
            },
            {
                className: "punctuation",
                begin: ':-|:~|[.;,{}()]|\\[|\\]',
            },
            {
                className: "operator",
                begin: '[<=>~+/\\&@]|[*-]',
            },
            {
                className: "literal",
                begin: '#inf|#sup|#true|#false',
                relevance: 10,
            },
            {
                className: "number",
                begin: "0x[0-9a-fA-F]+|0b[01]+|0o[0-7]+|0|[1-9][0-9]*",
                relevance: 0,
            },
            {
                className: "variable",
                begin: '[_\']*[A-Z][0-9a-zA-Z\'_]*',
                relevance: 0,
            },
            {
                className: "symbol",
                begin: '[_\']*[a-z][0-9a-zA-Z\'_]*',
                relevance: 0,
            },
            highlight.QUOTE_STRING_MODE,
            highlight.COMMENT('%\\*', '\\*%'),
            {
                "scope": "comment",
                "begin": "%",
                "end": "$",
            }
        ]
    }
}
