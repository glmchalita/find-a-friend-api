export class CnpjAlreadyRegisteredError extends Error {
  constructor() {
    super('CNPJ already registered.')
  }
}
