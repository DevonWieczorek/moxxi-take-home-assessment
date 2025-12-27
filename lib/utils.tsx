type ClassName = string | undefined | null | false | 0;

export const classList = (classes: ClassName[]): string =>
	classes.filter((cls): cls is string => Boolean(cls)).join(' ');