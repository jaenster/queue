import {FiFo} from "../queue/fi-fo";
import {Work} from "./work";

export class BurstQueue<T> extends FiFo<T> {

    private isSet: number = 0;

    constructor(private readonly cb: (args: BurstQueue<T>) => any) {
        super(() => {
            if (++this.isSet === 1) Work.queue.add({
                work: () => {
                    this.isSet = 0;
                    this.cb(this);
                }
            });
        })
    }
}