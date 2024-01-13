import actions from '../../src/core/actions';

describe('Actions', () => {
    beforeEach(() => {
        actions.clear();
    });

    test('No callbacks for device', () => {
        expect(actions.getCallbacks('device', 'event').length).toEqual(0);
    });

    test('No callbacks for event', () => {
        actions.addCallback('device', 'event', () => {
            console.log('callback');
        });
        expect(actions.getCallbacks('device', 'event2').length).toEqual(0);
    });

    test('Test adding callbacks', () => {
        actions.addCallback('device', 'event', () => {
            console.log('callback');
        });
        const callbacks = actions.getCallbacks('device', 'event');
        expect(callbacks.length).toEqual(1);
    });

    test('Test adding few callbacks', () => {
        actions.addCallback('device', 'event', () => {
            console.log('callback');
        });
        actions.addCallback('device', 'event', () => {
            console.log('callback');
        });
        const callbacks = actions.getCallbacks('device', 'event');
        expect(callbacks.length).toEqual(2);
    });
});
