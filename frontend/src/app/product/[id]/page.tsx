"use client";

import { ProductCardPage } from "@/views/productCard";
import { use } from "react";

interface Props {
    params: Promise<{id: string}>;
}

export default function ProductCardRoute({params}: Props) {
    const {id} = use(params);
    return <ProductCardPage id={id}></ProductCardPage>
}