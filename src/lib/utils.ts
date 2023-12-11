import { Snackbar } from 'svelma/src';
import Alert from "$lib/Alert.svelte";
import Confirm from "$lib/Confirm.svelte";
import DOMPurify from 'isomorphic-dompurify';
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs';
import newUniqueId from 'locally-unique-id-generator';
import { sha256 } from "js-sha256";
import MarkdownIt from 'markdown-it';
import pako from "pako";
import {Base64} from "js-base64";
import highlight from "highlight.js";
import {asp} from "$lib/highlight_asp";
import fromCharCodes from "string-from-charcodes";

highlight.registerLanguage("asp", asp);

const markdownIt = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && highlight.getLanguage(lang)) {
      try {
        return `<pre class="language-${lang}"><code class="language-${lang}">${highlight.highlight(str, { language: lang }).value}</code></pre>`;
      } catch (__) { /* empty */ }
    }

    return '';  // use external default escaping
  },
  linkify: true,
});

export class DOMPurifyConfig {
  DOMAIN = 'example.com';
  PURIFY_LOG_ERRORS = false;
  PURIFY_EXTERNAL_LINK_PREFIXES: string[] = [];
  PURIFY_ALLOWED_TAGS: string[] = [];
  PURIFY_ALLOWED_ATTR: string[] = [];

  constructor(consts: object) {
    for (const key in this) {
      if (key in consts) {
        const { [key]: value } = consts;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this[key] = value;
      }
    }
  }
}

export class Utils {
  static to_map(list, key, options: any = {}) {
    options.initial =
      options.initial ||
      function (obj) {
        return obj;
      };
    options.reduce =
      options.reduce ||
      function (res, obj) {
        return obj;
      };
    return list.reduce(function (map, obj) {
      if (!map.has(obj[key])) {
        map.set(obj[key], options.initial(obj));
      } else {
        map.set(obj[key], options.reduce(map.get(obj[key]), obj));
      }
      return map;
    }, new Map());
  }

  static to_index_map(list, key, start_index = 0) {
    return Utils.to_map(list, key, {
      initial: () => start_index++,
    });
  }

  static patch(list, patched_data, key, callback) {
    patched_data = Utils.to_map(patched_data, key);
    for (const i in list) {
      if (list[i][key] in patched_data) {
        const record = patched_data[list[i][key]];
        Object.keys(record).forEach((field) => {
          if (field !== key) {
            callback(i, record, field);
          }
        });
      }
    }
  }

  static sha256_digest(message) {
    const hash = sha256.create();
    hash.update(message);
    return hash.hex();
  }

  static remove_all_cookies() {
    this.confirm({
      message: "Do you want to remove all our cookies from this browser and reload the page?",
      onconfirm: () => {
        document.cookie = '';
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
      }
    });
  }

  static snackbar(message: string, props = {}) {
    Snackbar.create({ message: message, position: 'is-top-right', ...props });
  }

  static confirm(props) {
    new Confirm({
      target: document.body,
      props,
      intro: true,
    });
  }

  static alert(props) {
    new Alert({
      target: document.body,
      props,
      intro: true,
    });
  }

  static render_markdown(content: string, config: DOMPurifyConfig) {
    return this.dom_purify(markdownIt.render(content), config);
  }

  static render_inline_markdown(content: string, config: DOMPurifyConfig) {
    return this.dom_purify(markdownIt.renderInline(content), config);
  }

  static dom_purify(content: string, config: DOMPurifyConfig = new DOMPurifyConfig({})) {
    const accepted_prefixes = config.PURIFY_EXTERNAL_LINK_PREFIXES;
    const protocol_regex = new RegExp('^(?:[a-z]+:)?//', 'i');
    DOMPurify.addHook('afterSanitizeAttributes', (node) => {
      if ('href' in node) {
        const href = node.href;
        if (accepted_prefixes.some((prefix) => href.startsWith(prefix))) {
          node.target = '_blank';
        } else if (!href.startsWith(config.DOMAIN) && protocol_regex.test(href)) {
          node.href = '#disabled:' + href;
        }
      }
    });
    const res = DOMPurify.sanitize(content, {
      // USE_PROFILES: {html: true},
      ALLOWED_TAGS: config.PURIFY_ALLOWED_TAGS,
      ALLOWED_ATTR: config.PURIFY_ALLOWED_ATTR,
      KEEP_CONTENT: false,
    });
    DOMPurify.removeHook('afterSanitizeAttributes');
    if (config.PURIFY_LOG_ERRORS && DOMPurify.removed.length > 0) {
      console.log('DOMPurified:', DOMPurify.removed);
    }
    return res;
  }

  static latex() {
    const elems = document.getElementsByClassName('latex');
    Array.from(elems).forEach((e) => {
      renderMathInElement(e, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true },
        ],
      });
    });
  }

  static add_copy_button(element: Element) {
    const div = document.createElement("div");
    element.classList.add('container', 'p-2');
    element.prepend(div);
    div.outerHTML = '<div class="position-absolute top-0 end-0" style="z-index: 1;"><button class="btn btn-secondary btn-sm" onclick="navigator.clipboard.writeText(this.parentElement.parentElement.textContent)"><i class="bi-clipboard-plus"></i></button></div>';
  }

  static delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  static compress(object: object) {
    const json = JSON.stringify(object);
    const encoded = Base64.encode(json);
    const binData = pako.deflate(encoded);
    return Base64.fromUint8Array(binData);
  }

  static uncompress(base64data: string) {
    const binData = Base64.toUint8Array(base64data);
    const encoded = pako.inflate(binData);
    const json = Base64.decode(fromCharCodes(encoded));
    return JSON.parse(json);
  }

  static abbreviate(string: string, length: number) {
    return string.length <= length ? string : string.substring(0, length - 1) + "…";
  }

}

export class RecordsCallbacks {
  key: string;
  all = [];
  key2index = new Map();
  callbacks = new Map();

  constructor(key = 'uuid') {
    this.key = key;

    this.subscribe((index, record, fields) => {
      fields.forEach((field) => {
        this.all[index][field] = record[field];
      });
    });
  }

  get keys() {
    return this.key2index.keys();
  }

  with(records, reset = false) {
    if (reset) {
      this.all.length = 0;
    }
    this.all.push(...records);
    this.key2index = Utils.to_index_map(this.all, this.key);
    return this;
  }

  subscribe(callback) {
    const id = newUniqueId();
    this.callbacks.set(id, callback);
    return () => this.callbacks.delete(id);
  }

  trigger(key, record, fields = null) {
    fields = fields || Object.keys(record);
    this.callbacks.forEach((callback) => {
      callback(this.index_of(key), record, fields);
    });
  }

  at(index) {
    return this.all[index];
  }

  get(key) {
    return this.all[this.index_of(key)];
  }

  index_of(key) {
    return this.key2index.get(key);
  }
}
