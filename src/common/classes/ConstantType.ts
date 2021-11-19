export class TypeValue {
  id: number;
  value: number;
  createdAt: Date;
  constantTypeId?: number;
}

export class ConstantType {
    id: number;
    name: string
    values: TypeValue[];

    static TAX = 1;
    static COMISSION = 2;
    static REGISTER = 3;
}
