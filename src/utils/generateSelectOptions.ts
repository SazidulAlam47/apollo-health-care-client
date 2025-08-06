const generateSelectOptions = (enumObject: Record<string, string>) => {
    return Object.values(enumObject).map((value) => ({
        value,
        label: value,
    }));
};

export default generateSelectOptions;
