export function isValidMetadata(metadata: Record<string, unknown>): boolean {
    for (const key in metadata) {
        if (Number.isNaN(metadata[key]) || (typeof metadata[key] !== 'string' && typeof metadata[key] !== 'number')) {
            return false;
        }
    }
    return true;
}
