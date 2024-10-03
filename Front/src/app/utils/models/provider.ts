// ProvidersData model has 2 elements
// total gets the amount of providers registered for pagination
// items is a list of Providers Model
export class ProvidersData {
  total?: string;
  items?: Providers[];
}

// Providers model
export class Providers {
  id?: string;
  name?: string;
  trade_name?: string;
  address?: string;
  constructor(data: any = null) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.trade_name = data.trade_name;
      this.address = data.address;
    }
  }
}

// For Factory design Pattern with a blank Provider object creation
export class ProviderFactory {
  static createProvider(): Providers {
    const provider = new Providers();
    provider.name = '';
    provider.trade_name = '';
    provider.address = '';
    return provider;
  }
}