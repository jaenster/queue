import {BurstQueue} from "../../src";

const delay = (ms?: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('fi fo', function () {



    let notified = [];
    const bq = new BurstQueue<number>(notified.push.bind(notified));
    const seq = [1, 3, 3, 7];

    it('adding nothing doesnt give a has', () => {
        expect(bq.has()).toBeFalsy();
        bq.add() // Add nothing
        expect(bq.has()).toBeFalsy();
    })

    it('add something give a has', async () => {
        expect(bq.has()).toBeFalsy();
        bq.add(...seq)
        expect(bq.has()).toBeTruthy();
        // not notified yet, happens next tick
        expect(notified).toHaveLength(0);

        await delay();
        expect(notified).toHaveLength(1);
        expect([...notified.shift()].join()).toBe(seq.join())
        expect(bq.has()).toBeFalsy();

    })

    it('get next', async () => {
        expect(bq.has()).toBeFalsy();
        bq.add(...seq)
        expect(bq.has()).toBeTruthy();
        // not notified yet, happens next tick
        expect(notified).toHaveLength(0);

        // Get first out of line
        const first = bq.next();
        expect(notified).toHaveLength(0);

        await delay();
        expect(notified).toHaveLength(1);
        expect([first,...notified.shift()].join()).toBe(seq.join())
        expect(bq.has()).toBeFalsy();
    })


    it('clean up later', async () => {
        while (bq.has()) bq.next();
        bq.add(...seq);
        while (bq.has()) bq.next();
        expect((bq as any).i).toBeGreaterThan(0);

        // Return after next micro tick
        await delay();
        expect((bq as any).i).toEqual(0);
    });
})