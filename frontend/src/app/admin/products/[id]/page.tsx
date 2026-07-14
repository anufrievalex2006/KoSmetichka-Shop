"use client";

import { AdminProductDetailsPage } from "@/views/admin/adminProduct";
import { use } from "react";

interface Props {
    params: Promise<{id: string}>;
}

export default function AdminProductRoute({params}: Props) {
    const {id} = use(params);
    return <AdminProductDetailsPage id={id}></AdminProductDetailsPage>
}