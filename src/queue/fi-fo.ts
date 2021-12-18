import {Queue} from "./queue";

export class FiFo<T = any> extends Queue<T> {
    private i = 0;
    private itemsRemoving: number = 0;

    public has(): boolean {
        return this.i < this.q.length;
    }

    get size() {
        return this.q.length - this.i;
    }

    next(): T {
        try {
            return this.q[this.i++];
        } finally {
            // once we have idle time, clean up the items we had in the queue
            if (!this.itemsRemoving++) setTimeout(() => {
                this.q.splice(0, this.i);
                this.itemsRemoving = this.i = 0;
            });
        }
    }

}