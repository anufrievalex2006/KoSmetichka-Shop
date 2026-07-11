"use client";

import { CategoryCatalogPage } from "@/views/catalogChosen";
import { use } from "react";

interface Props {
    params: Promise<{categoryId: string}>;
}

export default function CatalogRoute2({params}: Props) {
    const {categoryId} = use(params);
    return <CategoryCatalogPage categoryId={categoryId}></CategoryCatalogPage>
}