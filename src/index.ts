import * as faqtor from "faqtor";
import * as uglify from "uglify-js";
import * as fs from "fs";
import * as util from "util";

const defaultOpts: uglify.MinifyOptions = {
    mangle: true,
	compress: {
		sequences: true,
		dead_code: true,
		conditionals: true,
		booleans: true,
		unused: true,
		if_return: true,
		join_vars: true,
		drop_console: true
	}
};

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export const minify = (src: string, dst: string, options: uglify.MinifyOptions = defaultOpts): faqtor.IFactor => {
    const run = async (): Promise<Error> => {
        const inp = await readFile(src, {encoding: "utf8"}).catch(e => Error(e));
        if (inp instanceof Error) { return inp; }
        const code = uglify.minify(inp, options);
        if (code.error) return code.error;
        const r = await writeFile(dst, code.code, {encoding: "utf8"}).catch((e) => Error(e));
        if (r instanceof Error) return r;
        return null;
    }

    return faqtor.func(run, src, dst);
}
