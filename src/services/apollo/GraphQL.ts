import { Apollo } from "apollo-angular";

export abstract class GraphQL<Params, Result> {
    readonly name: string;
    constructor(readonly apollo: Apollo) {
        this.name = this.getName();
    }

    getVariables<T, R>(params?: Params) {
        let variables = {};
        if (!params) {
            return variables;
        }
        Object.keys(params).forEach(key => {
            // @ts-ignore
            if (params[key]) {
                // @ts-ignore
                variables[key] = params[key];
            }
        });
        return variables;
    }

    /**
     * Converts the name of the class to the name of the query or mutation.
     * @returns The name of the query or mutation
     */
    private getName() {
        const className = this.constructor.name;
        let suffix: string = 'Query'
        if (this.endsWith(className, 'Mutation')) {
            suffix = 'Mutation';
        }
        let nameWithoutLastWord = this.replaceLast(this.constructor.name, suffix, '');
        return nameWithoutLastWord.charAt(0).toLocaleLowerCase() + nameWithoutLastWord.slice(1);
    }

    /**
     * Replaces the last occurrence of a string with another substring
     * @param str String we want to make a replacement
     * @param search Text to be replaced
     * @param replace New text that replaces the other one
     * @returns A string with the substring replaced
     */
    private replaceLast(str: string, search: string, replace: string) {
        return str.replace(new RegExp(search + `([^"${search}"]*)$`), replace + "$1");
    }

    /**
     * Verifies if a string finishes with a suffix
     * @param str String you want to check
     * @param suffix Suffix with the string should end
     * @returns Boolean indicating if the string finishes with the suffix
     */
    private endsWith(str: string, suffix: string) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
}