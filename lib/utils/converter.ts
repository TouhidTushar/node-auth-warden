// Function to convert enum values to a comma-separated string
export default {
  enumToString: function (enumObj: object): string {
    const enumValues = Object.values(enumObj).map((value) => `'${value}'`);
    return enumValues.join(', ');
  },
};
