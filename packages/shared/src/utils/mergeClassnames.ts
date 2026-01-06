export const mergeClassnames = (...classnames: Array<string | undefined>) => {
	return classnames.filter((classname) => !!classname).join(' ');
};
