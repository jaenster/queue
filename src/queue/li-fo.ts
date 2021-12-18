import {Queue} from "./queue";

export class LiFo<T = any> extends Queue<T> {

    next(): T {
        return this.q.pop();
    }

}