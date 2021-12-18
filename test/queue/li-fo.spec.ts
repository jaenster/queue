import {LiFo} from '../../src';

describe('stack', function () {
    const stack = new LiFo<number>();
    const seq = [1, 3, 3, 7];

    it('adding nothing doesnt give a has', () => {
        expect(stack.has()).toBeFalsy();
        stack.add() // Add nothing
        expect(stack.has()).toBeFalsy();
    })

    it('add something give a has', () => {
        expect(stack.has()).toBeFalsy();
        stack.add(...seq)
        expect(stack.has()).toBeTruthy();
    })

    it('get next', () => {
        const next = [stack.next(), stack.next(), stack.next(), stack.next()];
        expect(stack.size).toEqual(0)
        expect(next.reverse().join(',')).toBe(seq.join(','));
    })

    it('notify', () => {
        let called = 0;
        stack.setCallback(() => ++called);
        stack.add(...seq);
        expect(called).toBe(1);
    })

})