import { Providers } from "../app/utils/models/provider";

export const environment = {
  production: true,
  version: "0.0.1",
  api: "http://localhost:3000/"
};

export const mockedProviders: Providers[] = [

  {
    "id": "1",
    "name": "Distribuidora I 1",
    "trade_name": "Distribuidora I 1 S.C.",
    "address": "Paseo 202, Ciudad E, País C"
  },
  {
    "id": "2",
    "name": "Empresa A 2",
    "trade_name": "Empresa A 2 S. en C. por A.",
    "address": "Avenida 456, Ciudad B, País A"
  },
  {
    "id": "3",
    "name": "Corporativo J 3",
    "trade_name": "Corporativo J 3 S.C.",
    "address": "Circuito 303, Ciudad F, País B"
  },
  {
    "id": "4",
    "name": "Empresa B 4",
    "trade_name": "Empresa B 4 S. en C. por A.",
    "address": "Paseo 202, Ciudad E, País A"
  },
  {
    "id": "5",
    "name": "Industrias G 5",
    "trade_name": "Industrias G 5 S.C.",
    "address": "Calle 123, Ciudad A, País C"
  },
  {
    "id": "6",
    "name": "Empresa C 6",
    "trade_name": "Empresa C 6 S. en C. por A.",
    "address": "Avenida 456, Ciudad B, País B"
  },
  {
    "id": "7",
    "name": "Empresa B 7",
    "trade_name": "Empresa B 7 S.A.P.I. de C.V.",
    "address": "Boulevard 789, Ciudad C, País B"
  },
  {
    "id": "8",
    "name": "Industrias G 8",
    "trade_name": "Industrias G 8 S. en C. por A.",
    "address": "Circuito 303, Ciudad F, País B"
  },
  {
    "id": "9",
    "name": "Empresa A 9",
    "trade_name": "Empresa A 9 S.C.",
    "address": "Paseo 202, Ciudad E, País A"
  },
  {
    "id": "10",
    "name": "Industrias G 10",
    "trade_name": "Industrias G 10 S. en C. por A.",
    "address": "Avenida 456, Ciudad B, País C"
  }];


export const mockedProvider: Providers =
{
  "id": "1",
  "name": "Distribuidora I 1",
  "trade_name": "Distribuidora I 1 S.C.",
  "address": "Paseo 202, Ciudad E, País C"
};
