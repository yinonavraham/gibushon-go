export interface Validatable {
    validate() : Error | null;
}