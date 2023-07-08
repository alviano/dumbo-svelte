import highlight from "highlight.js";

export function asp() {
    return {
        case_insensitive: true, // language is case-insensitive
        keywords: {
            $pattern: /#?[a-z]+[+]?|:-|:~|[.]/,
            keyword: 'not #true #false #count #sum #sum+ #min #max #show :- :~ .',
        },
        contains: [
            {
                className: 'string',
                begin: '"',
                end: '"',
                relevance: 0,
            },
            {
                className: "number",
                begin: "0|[0-9]+",
                relevance: 0,
            },
            highlight.COMMENT('%\\*', '\\*%'),
            {
                "scope": "comment",
                "begin": "%",
                "end": "$",
            }
        ]
    }
}
