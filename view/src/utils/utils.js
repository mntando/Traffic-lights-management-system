// Status code
export function msg(code) {
    const faults = [];
    let ledFaults = [];

    if (!(code & 0b00001)) { faults.push('Not operational'); }
    if (code & 0b10000) { faults.push('Unresponsive'); }
    if (code & 0b00010) { ledFaults.push('Red'); }
    if (code & 0b00100) { ledFaults.push('Yellow'); }
    if (code & 0b01000) { ledFaults.push('Green'); }

    if (ledFaults.length > 0) {
        faults.push(`${ledFaults.join(', ')} ${ledFaults.length > 1 ? 'LEDs' : 'LED'}`);
    }
    return faults.length === 0 ? 'Functional' : `Faults: ${faults.join(', ')}`;
}
