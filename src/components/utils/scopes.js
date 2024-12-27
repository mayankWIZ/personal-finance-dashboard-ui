export const SCOPES = {
    "Me": ["me"],
    "Admin": ["me", "admin"],
    "Super Admin": ["me", "admin", "transaction_read", "transaction_write"],
    "Transaction Readonly": ["me", "transaction_read"],
    "Transaction Admin": ["me", "transaction_read", "transaction_write"],
}