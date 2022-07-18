/**
 * A dedicated error to be thrown when nothing is selected
 */
export class NothingSelectedError extends Error {
    constructor(message: string = 'Select at least one element 🙈') {
        super(message)
    }
}