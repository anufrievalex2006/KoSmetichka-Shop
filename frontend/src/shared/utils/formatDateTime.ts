export function formatDateTime(date: string): string {
    const d = new Date(date);
    d.setHours(d.getHours() + 7);
    const p1 = d.toLocaleDateString('ru-RU', {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    const p2 = d.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit"
    });
    return `${p1} в ${p2}`;
}