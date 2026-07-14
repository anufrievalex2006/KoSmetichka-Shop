export interface IFileRepo {
    upload(file: File): Promise<string>;
}