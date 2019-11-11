export class CannotSignInError extends Error {
  constructor(message: string) {
    super()
    Object.defineProperty(this, 'name', {
      get: () => this.constructor.name
    })
    Object.defineProperty(this, 'message', {
      get: () => {
        return `${message}`
      }
    })
    Error.captureStackTrace(this, this.constructor)
  }
}
