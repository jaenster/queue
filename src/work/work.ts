import {FiFo} from "../queue/fi-fo";

export interface Workable {
    work(): void | Promise<void>
}

let timeoutSet = 0;
export const Work = () => {
    timeoutSet = 0;

    const {queue} = Work;
    while (queue.has()) queue.next().work();
};

Work.queue = new FiFo<Workable>(() => {
    if (++timeoutSet === 1) setTimeout(Work);
});