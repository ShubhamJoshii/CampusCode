export class ValidationError extends Error {
  constructor(target, message) {
    super(message);
    this.name = "ValidationError"; // Good practice to identify the error type
    this.target = target;
  }
}