import {Work, Workable} from '../../src/work/work';

const delay = (ms?: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('work queue', () => {

    it('adding work', async () => {

        let called = 0, timeoutCalled = 0;
        const worker: Workable = {
            work() {
                if (called === 0) setTimeout(() => {
                    timeoutCalled++;
                    Work.queue.add(worker, worker)
                });
                if (called === 0) {
                    Work.queue.add(worker, worker);
                }
                called++;
            }
        };
        Work.queue.add(worker, worker)

        expect(Work.queue.size).toEqual(2);
        await delay(); // trigger micro tick
        expect(Work.queue.size).toEqual(0);
        expect(called).toEqual(4);


        expect(Work.queue.size).toEqual(0);
        expect(timeoutCalled).toEqual(0);
        await delay(); // trigger micro tick
        expect(Work.queue.size).toEqual(2);
        expect(timeoutCalled).toEqual(1);


        await delay(); // trigger micro tick
        expect(Work.queue.size).toEqual(0);

        expect(called).toEqual(6);
    })
})