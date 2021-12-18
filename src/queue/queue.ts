type Callback<T> = () => void

export abstract class Queue<T> {

    *[Symbol.iterator]() {
        while(this.has()) yield this.next();
    }

    constructor(protected readonly callback?: Callback<T>) {

    }

    add(...t: T[]): this {
        const callCB = this.callback && !this.has();

        this.q.push(...t);

        // call cb if we had no items in queue
        callCB && this.callback();
        return this;
    }

    public abstract next(): T;

    public has(): boolean {
        return !!this.q.length;
    }

    get size() {
        return this.q.length;
    }

    setCallback(cb: Callback<T>): this {
        (this as any as { callback: Callback<T> }).callback = cb;
        return this;
    }

    protected readonly q: T[] = [];

    forEach(cb: (v: T) => any) {
        while (this.has()) cb(this.next());
    }

}