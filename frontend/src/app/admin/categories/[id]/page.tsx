"use client";

import { AdminCategoryPage } from "@/views/admin/adminCategory";
import { use } from "react";

interface Props {
    params: Promise<{id: string}>;
}

export default function AdminCategoryRoute({params}: Props) {
    const {id} = use(params);
    return <AdminCategoryPage id={id}></AdminCategoryPage>
}