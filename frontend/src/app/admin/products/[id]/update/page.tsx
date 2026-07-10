"use client";

import { AdminProductUpdatePage } from "@/views/admin/adminProductUpdate";
import { use } from "react";

interface Props {
    params: Promise<{id: string}>;
}

export default function AdminProductUpdateRoute({params}: Props) {
    const {id} = use(params);
    return <AdminProductUpdatePage id={id}></AdminProductUpdatePage>
}