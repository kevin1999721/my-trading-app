export type Operator = '>=' | '<=' | '=' | 'contains' | 'notContains';
export type FieldType = 'dateTime' | 'date' | 'string' | 'number';

export type FilteringSetting<T = any> = {
	field: keyof T;
	fieldName: string;
	type: FieldType;
	valueGetter?: (value: any) => any;
};

export type FilteringCondition = {
	key: number;
	field: string;
	operator: Operator;
	value: any;
};

export type FieldTypeOperators = {
	[type in FieldType]: Operator[];
};

export const fieldTypeOperators: FieldTypeOperators = {
	string: ['contains', 'notContains'],
	number: ['<=', '>=', '='],
	date: ['<=', '>=', '='],
	dateTime: ['<=', '>=', '=', 'contains', 'notContains'],
};
