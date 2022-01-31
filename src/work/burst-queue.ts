import {FiFo} from "../queue/fi-fo";

export class BurstQueue<T> extends FiFo<T> {

    constructor(cb: (args: BurstQueue<T>) => any) {
        super(() => {
            if (++isSet === 1) setTimeout(() => {
                isSet = 0;
                cb(this);
            });
        })
        let isSet = 0;
    }
}