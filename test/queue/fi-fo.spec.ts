import {FiFo} from '../../src';

const delay = (ms?: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('fi fo', function () {
    const fifo = new FiFo<number>();
    const seq = [1, 3, 3, 7];

    it('adding nothing doesnt give a has', () => {
        expect(fifo.has()).toBeFalsy();
        fifo.add() // Add nothing
        expect(fifo.has()).toBeFalsy();
    })

    it('add something give a has', () => {
        expect(fifo.has()).toBeFalsy();
        fifo.add(...seq)
        expect(fifo.has()).toBeTruthy();
    })

    it('get next', () => {
        const next = [fifo.next(), fifo.next(), fifo.next(), fifo.next()];
        expect(next.join(',')).toBe(seq.join(','));
    })

    it('notify', () => {
        let called = 0;
        fifo.setCallback(() => ++called);
        fifo.add(...seq);
        expect(called).toBe(1);
    })

    it('clean up later', async () => {
        while (fifo.has()) fifo.next();
        fifo.add(...seq);
        while (fifo.has()) fifo.next();
        expect((fifo as any).i).toBeGreaterThan(0);

        // Return after next micro tick
        await delay();
        expect((fifo as any).i).toEqual(0);
    });
})