import { ContentCardCreateDto, ContentCardDto, ContentCardUpdateDto } from "../dto/contentCard";

export type ContentCardType = ContentCardDto["type"];

export interface IContentCardRepo {
    getAll(type?: ContentCardType): Promise<ContentCardDto[]>;
    getById(id: string): Promise<ContentCardDto>;
    create(req: ContentCardCreateDto): Promise<ContentCardDto>;
    update(id: string, req: ContentCardUpdateDto): Promise<ContentCardDto>;
    delete(id: string): Promise<void>;
}