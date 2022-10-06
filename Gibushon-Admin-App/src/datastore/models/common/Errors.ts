export function newIllegalNumberOfArgsError(args: any[]): Error {
    return new Error("BUG: Illegal number of arguments: " + args.length + " [" + Array.from(args) + "]");
}