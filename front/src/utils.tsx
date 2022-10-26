export const breakGroupsNamesInputsAndReturnArray = (namesInput: string): string[] => {

    if(namesInput === "")
        return [];
    return namesInput.split(',').join(' ').trim().split(/\s+/);
}

export const doesArrayContainsOtherArray = (firstArray: string[], secondArray: string[]): boolean => {
    return !secondArray.length || secondArray.every(group => firstArray.includes(group));
}

export const isNumber = (value: string | number): boolean => {
    return (!!value && !isNaN(Number(value.toString())));
}