<script>
    import '../app.css';
    import {Utils} from "$lib/utils";
    import {Base64} from "js-base64";
    import pako from "pako";


    const foo = `
10 ─  LONG PIPE
11 │  LONG PIPE
20 ╮  CORNER TUBE
21 ╯  CORNER TUBE
22 ╰  CORNER TUBE
23 ╭  CORNER TUBE
30 ╶  CLOSED PIPE
31 ╷  CLOSED PIPE
32 ╴  CLOSED PIPE
33 ╵  CLOSED PIPE
50 ┬  T PIPE
51 ┤  T PIPE
52 ┴  T PIPE
53 ├  T PIPE
    `.trim();
    const compressed = Utils.compress(foo);
    const decompressed = Utils.uncompress(compressed);
    console.log(foo)
    console.log(decompressed)


    const json = JSON.parse('{"input":"a.\\n§","encode_input":true,"decode_output":false,"recipe":[]}');
    const base64data = Utils.compress(json);
    const binData = Base64.toUint8Array(base64data);
    const encoded = pako.inflate(binData);
    console.log(binData)
    console.log(encoded)

    // console.log(binData)
    // console.log(encoded)
    // const json = String.fromCharCode.apply(null, [...new Uint16Array(encoded.buffer)]);
    // return JSON.parse(json);

</script>
asd
