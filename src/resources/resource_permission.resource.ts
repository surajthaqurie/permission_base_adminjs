import { DMMFClass, prisma } from "../utility";

const account_fields = Object.keys(((prisma as any)._baseDmmf as DMMFClass).modelMap);
const table_name = [];
for (let field of account_fields) {
  if (field !== "session") {
    const value = field.toUpperCase();
    const label = field;

    table_name.push({ value, label });
  }
}

const resource_permission = {
  resource: {
    model: ((prisma as any)._baseDmmf as DMMFClass).modelMap.ResourcePermission,
    client: prisma
  },
  options: {
    parent: null,
    actions: {},
    properties: {
      resource_name: {
        availableValues: table_name
      }
    }
  }
};

export default resource_permission;
