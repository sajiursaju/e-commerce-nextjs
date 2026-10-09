export type Role = "customer" | "admin" | "manager" | "accountant" | "employee";

export const STAFF_ROLES: Role[] = ["admin", "manager", "accountant", "employee"];

export const isStaff = (role?: string) => STAFF_ROLES.includes(role as Role);

// Only admin can delete anything
export const canDelete = (role?: string) => role === "admin";

export const ADMIN_MENU = [
  { label: "Dashboard", href: "/admin", roles: ["admin", "manager", "accountant", "employee"] },
  { label: "Products",  href: "/admin/products", roles: ["admin", "manager", "employee"] },
  { label: "Orders",    href: "/admin/orders", roles: ["admin", "manager", "employee", "accountant"] },
  { label: "Staff",     href: "/admin/staff", roles: ["admin"] },
];

// Which roles may open which URL
export const canAccess = (role: string | undefined, path: string) => {
  const item = [...ADMIN_MENU]
    .sort((a, b) => b.href.length - a.href.length)
    .find((m) => path === m.href || path.startsWith(m.href + "/"));
  return !!item && !!role && item.roles.includes(role);
};