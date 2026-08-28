# Authentication layers

## Booking `/api` (machine)

- Header: `X-API-KEY` (or `Authorization: Api-Key <token>`)
- Env: `ETRESS_API_KEY`
- Caller: Next.js BFF (`/api/backend/*`) — never the browser
- Webhooks MoMo/OM/deposit: **no** API key (operator verification)

## Future CUSTOMER (not implemented)

- End-user accounts with `User.role = CUSTOMER`
- Session/JWT after login, forwarded by the BFF
- Can set `Booking.booked_by_id` when present
- Remains **in addition to** the API key on the BFF → API hop

## Panel `/panel/api`

- JWT Bearer (staff / agency operators)

### Panel RBAC

| Profil | Condition | Droits clés |
|--------|-----------|-------------|
| **Platform Admin** | `is_staff=True` | CRUD compagnies (`/companies/*`), créer des `COMPANY_ADMIN`, voir tous les users |
| **Company Admin** | `is_staff=False` + `company_id` + `role=COMPANY_ADMIN` | Gérer users/agences/voyages de sa compagnie uniquement |
| **Agency Manager** | `role=AGENCY_MANAGER` + `agency_id` | Sous-ensemble restreint à son agence (scoping) |

`is_superuser` est un flag legacy — **non utilisé** pour l'autorisation panel.

#### Matrice rapide

| Action | Platform Admin | Company Admin | Agency Manager |
|--------|----------------|---------------|----------------|
| Créer une compagnie | oui | non | non |
| Créer un `COMPANY_ADMIN` | oui (avec `company_reference`) | non | non |
| Créer un agent (`TICKET_SELLER`, etc.) | oui | oui (sa compagnie) | oui (son agence) |
| Lister les users | tous | sa compagnie | son agence |
| Promouvoir vers `COMPANY_ADMIN` | oui | non | non |

## Account `/account`

- Session cookies
