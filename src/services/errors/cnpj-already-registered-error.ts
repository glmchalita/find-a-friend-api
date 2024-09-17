export class CNPJAlreadyRegisteredError extends Error {
  constructor() {
    super('CNPJ already registered.')
  }
}
