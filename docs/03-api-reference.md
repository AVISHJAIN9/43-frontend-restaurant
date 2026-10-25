# API & Client Services Reference: Gourmet Restaurant

## Axios Client Interface (`src/utils/api.js`)

| Method | Endpoint | Headers | Purpose |
|---|---|---|---|
| `POST` | `/api/auth/login` | Content-Type: application/json | Validates member credentials and returns JWT. |
| `POST` | `/api/auth/register` | Content-Type: application/json | Creates a new chef account. |
| `GET` | `/api/blogs` | Optional Bearer Token | Retrieves paginated culinary stories. |
| `GET` | `/api/blogs/:id` | Optional Bearer Token | Retrieves full recipe article details. |
| `POST` | `/api/blogs` | Bearer `<JWT>` | Publishes a custom culinary recipe story. |
