import { FieldValues } from 'react-hook-form';

const createFormData = (values: FieldValues) => {
    const { image, ...data } = values;

    const formData = new FormData();

    formData.append('data', JSON.stringify(data));

    if (image.length) {
        formData.append('file', image[0]);
    }

    // console.log(Object.fromEntries(formData));

    return formData;
};

export default createFormData;
