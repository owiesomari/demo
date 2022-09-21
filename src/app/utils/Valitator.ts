export class Validator {

    isElementEmpty(elemnt: HTMLInputElement |undefined) {
        return elemnt?.value == "" || elemnt?.value == null
    }
}