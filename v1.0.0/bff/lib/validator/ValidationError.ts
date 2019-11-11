class ValidationError extends Error {
  constructor(message: string, relatedErrors: Error[] = []) {
    super()
    Object.defineProperty(this, 'name', {
      get: () => this.constructor.name
    })
    Object.defineProperty(this, 'message', {
      get: () => {
        const errors = relatedErrors.map(e => `\n${e.message}`)
        return `${message}\n${errors}`
      }
    })
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ValidationError
