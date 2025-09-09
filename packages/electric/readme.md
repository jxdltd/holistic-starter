# `@repo/electric`

> If you don't need a sync engine then feel free to delete this package and remove it from the rest of the repo.

- [ElectricSQL](https://electric-sql.com/) - [Docs](https://electric-sql.com/docs) - [Cloud](https://electric-sql.com/product/cloud)

## Setup

We assume you're using Electric Cloud which is currently free to use.

1. In your Neon settings, enable logical replication.
1. Copy your connection URL over to Electric.
1. Add your source ID and secret to your `.env` file.
1. Create new `/api/shapes/*` endpoints to proxy requests to the Electric API.
