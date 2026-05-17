export = r;
declare function r(t: any): r;
declare class r {
    constructor(t: any);
    actual: any;
    not: {} | undefined;
    array(n?: {}): string | boolean;
    boolean(t: any): boolean;
    empty(t: any): any;
    eq(t: any, n: any): any;
    function(): string | boolean;
    in(t: any, n?: {
        mode: string;
    }): any;
    nan(t: any): boolean;
    null(t: any): boolean;
    number(t: any): any;
    object(n: any): string | boolean;
    oftype(t: any, r: any): any;
    regexp(): boolean;
    representation(t: any): string | boolean;
    string(t?: {
        empty: boolean;
    }): boolean;
    symbol(): string | boolean;
    undefined(t: any): boolean;
}
declare namespace r {
    function extend(t: any): void;
    function array(t: any): string | boolean;
    function object(t: any): string | boolean;
    function representation(t: any, r: any): string | boolean;
    function type(t: any, n: any, e: any): boolean | "unknown" | "object" | "function" | "string" | "number" | "null" | "symbol" | "undefined" | "boolean" | "array" | "regexp";
    function typeOf(t: any, r: any): boolean;
}
