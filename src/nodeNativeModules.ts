export const nodeNativeModules: string[] = [
    'assert',
    'buffer',
    'child_process',
    'cluster',
    'console',
    'crypto',
    'dns',
    'domain',
    'events',
    'fs',
    'http',
    'https',
    'net',
    'os',
    'path',
    'punycode',
    'querystring',
    'readline',
    'stream',
    'string_decoder',
    'tls',
    'dgram',
    'url',
    'util',
    'vm',
    'zlib',
];

export function getNodeNativeModuleDocumentURL(packageName: string) {
    return `https://nodejs.org/api/${packageName}.html`;
}
