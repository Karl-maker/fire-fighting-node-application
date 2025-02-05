export interface Repository<E> {
    save(device: E): Promise<E>;
}