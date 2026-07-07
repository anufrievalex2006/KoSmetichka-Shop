import { UserRole } from "@/domain";
import { IconCategory, IconTags, IconNews, IconDiscount2, IconTruckDelivery, IconUsers, IconMessageQuestion, IconChartBar } from "@tabler/icons-react";

export interface NavItem {
    label: string;
    href: string;
    icon: React.ComponentType<{size?: number}>;
    roles: UserRole[];
}

export const adminNavItems: NavItem[] = [
    { label: "Категории", href: "/admin/categories", icon: IconCategory, roles: ["ADMIN", "CREATOR"] },
    { label: "Производители", href: "/admin/brands", icon: IconTags, roles: ["ADMIN", "CREATOR"] },
    { label: "Новости", href: "/admin/news", icon: IconNews, roles: ["ADMIN", "CREATOR"] },
    { label: "Акции", href: "/admin/promotions", icon: IconDiscount2, roles: ["ADMIN", "CREATOR"] },
    { label: "Поставщикам", href: "/admin/suppliers", icon: IconTruckDelivery, roles: ["ADMIN", "CREATOR"] },
    { label: "Пользователи", href: "/admin/users", icon: IconUsers, roles: ["ADMIN"] },
    { label: "Обращения", href: "/admin/appeals", icon: IconMessageQuestion, roles: ["ADMIN"] },
    { label: "Статистика сайта", href: "/admin/statistics", icon: IconChartBar, roles: ["ADMIN"] },
];