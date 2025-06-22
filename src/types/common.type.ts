export type TMeta = {
    page: number;
    limit: number;
    totalData: number;
    totalPage: number;
};

export type TResponseSuccessType = {
    data: any;
    meta?: TMeta;
};

export type TResponseErrorType = {
    statusCode: number;
    message: string;
};
