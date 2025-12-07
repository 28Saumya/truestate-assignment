# Architecture

## Backend Architecture
- **Entry**: `backend/src/index.js`
- **Routing**: `routes/salesRoutes.js`
- **Controllers**: HTTP layer (`salesController.js`)
- **Services**: Business logic (`salesService.js`)
- **Utils**:
  - `querySales.js` – streams CSV and applies search / filter / sort / pagination
  - `loadDashboard.js` – streams CSV once and prepares dashboard aggregates
- **Data source**: `data/sales.csv`

## Frontend Architecture
- **Entry**: `main.jsx`, `App.jsx`
- **Page**: `pages/Dashboard.jsx` – combines summary + transactions table
- **Components**:
  - `SearchBar` – full-text search
  - `FilterPanel` – multi-filter form
  - `SortDropdown` – sort options
  - `SalesTable` – table rendering
  - `Pagination` – page navigation
- **Services**: `services/api.js` – Axios wrappers for backend APIs

## Data Flow
1. User types search / chooses filters / sorting / page.
2. `Dashboard.jsx` calls `fetchSales` with query params.
3. Backend `/api/sales` streams CSV → filters → sorts → paginates → returns JSON.
4. Frontend renders `SalesTable` and `Pagination`.
5. Dashboard summary (`/api/dashboard`) is fetched once and shown in cards.

## Folder Structure
(then copy the exact tree from the PDF and show how your files fit)
