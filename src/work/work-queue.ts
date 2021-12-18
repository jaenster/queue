import {Work} from "./work";
import {FiFo} from "../queue/fi-fo";

export abstract class WorkQueued<T> {

    protected queue: FiFo<T> = new FiFo(Work.queue.add.bind(Work.queue, this));

    public send(...t: T[]) {
        this.queue.add(...t);
    }

    protected abstract handle(t: T): void

    protected work() {
        while (this.queue.has()) {
            this.handle(this.queue.next());
        }
    }
}