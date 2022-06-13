const KEYBOARD_EVENTS = {
    SPACE: ' ',
    D_KEY: 'd',
    S_KEY: 's',
    A_KEY: 'a',
    W_KEY: 'w',
    Z_KEY: 'z',
    Q_KEY: 'q',
    ARROW_DOWN: 'ArrowDown',
    ARROW_UP: 'ArrowUp',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight'
};


export default class KeyboardEventsController {
    isUpEvent(keyEvent) {
        return keyEvent === KEYBOARD_EVENTS.ARROW_UP ||
            keyEvent.toLowerCase() === KEYBOARD_EVENTS.W_KEY ||
            keyEvent.toLowerCase() === KEYBOARD_EVENTS.Z_KEY;
    }

    isDownEvent(keyEvent) {
        return keyEvent === KEYBOARD_EVENTS.ARROW_DOWN ||
        keyEvent === KEYBOARD_EVENTS.S_KEY;
    }

    isLeftEvent(keyEvent) {
        return keyEvent.toLowerCase() === KEYBOARD_EVENTS.A_KEY ||
            keyEvent.toLowerCase() === KEYBOARD_EVENTS.Q_KEY ||
            keyEvent === KEYBOARD_EVENTS.ARROW_LEFT;
    }

    isRightEvent(keyEvent) {
        return keyEvent.toLowerCase() === KEYBOARD_EVENTS.D_KEY ||
            keyEvent === KEYBOARD_EVENTS.ARROW_RIGHT;
    }

    isRotateEvent(keyEvent) {
        return keyEvent === KEYBOARD_EVENTS.A_KEY;
    }

    isPanEvent(keyEvent) {
        return keyEvent === KEYBOARD_EVENTS.D_KEY;
    }

    isZoomEvent(keyEvent) {
        return keyEvent === KEYBOARD_EVENTS.S_KEY;
    }

    isSpaceEvent(keyEvent) {
        return keyEvent === KEYBOARD_EVENTS.SPACE;
    }
}
