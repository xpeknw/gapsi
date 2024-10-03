export class ProvidersData {
  total?: string;
  items?: Providers[];
}

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

// For Factory design Pattern
export class ProviderFactory {
  static createProvider(): Providers {
    const provider = new Providers();
    provider.name = '';
    provider.trade_name = '';
    provider.address = '';
    return provider;
  }
}