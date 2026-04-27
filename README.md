# Prueba de Desempeño - Sistema de Gestión con Next.js + Prisma

## README.md detallado con:

### 3. Descripción del proyecto y módulo

Sistema web desarrollado con **Next.js + TypeScript + Prisma + PostgreSQL** para administrar usuarios, autenticación segura y gestión de documentos.

### Módulos:

* Autenticación (login/register)
* Usuarios
* Roles y permisos
* Documentos
* Bitácora
* Panel administrativo

---

### 4. Requisitos previos

Instalar antes de iniciar:

* Node.js 18+
* npm o yarn
* PostgreSQL 14+
* Git
* Visual Studio Code (opcional)

Verificar:

```bash
node -v
npm -v
psql --version
```

---

### 5. Instalación paso a paso

```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd TU_REPOSITORIO
npm install
```

Crear base de datos PostgreSQL:

```sql
CREATE DATABASE prueba_db;
```

Migraciones:

```bash
npx prisma generate
npx prisma migrate dev
```

---

### 6. Configuración de variables de entorno

Crear archivo `.env`

```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/prueba_db"
JWT_SECRET="secret123"
JWT_REFRESH_SECRET="refresh123"
PORT=3000
```

Crear archivo `.env.example`

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME"
JWT_SECRET="your_secret"
JWT_REFRESH_SECRET="your_refresh_secret"
PORT=3000
```

---

### 7. Comandos para ejecutar

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

Proyecto en:

```text
http://localhost:3000
```

---

### 8. Documentación de endpoints (curl o Postman)

## Auth

### Registrar usuario

```bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"test@test.com","password":"123456"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@test.com","password":"123456"}'
```

### Obtener usuario actual

```bash
curl http://localhost:3000/api/auth/me
```

## Usuarios

```bash
GET /api/users
PUT /api/users/:id
```

## Documentos

```bash
GET /api/document
POST /api/document
```

---

### 9. Datos de prueba

## Usuario administrador

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

## Usuario normal

```json
{
  "email": "user@test.com",
  "password": "123456"
}
```

## Request ejemplo documento

```json
{
  "title": "Contrato",
  "content": "Documento de prueba",
  "keywords": ["legal","empresa"]
}
```

---

### 10. Colección Postman o archivo .env.example con valores de prueba

Incluido `.env.example`.

Colección Postman sugerida:

* Auth Register
* Auth Login
* Auth Me
* Users Get
* Documents Create
* Documents List

---

### 11. Diagrama de entidades (ER diagram)

```text
User
----
id (PK)
email
password
role
status
createdAt

Document
--------
id (PK)
title
content
keywords
userId (FK)
createdAt

Bitacora
--------
id (PK)
action
entityType
entityId
details
createdAt
userId (FK)

Relaciones:
User 1 --- N Document
User 1 --- N Bitacora
```

---

# 👨‍💻 Autor

Estiven Mosquera

---

# ✅ Proyecto listo para usar

```bash
npm install
npx prisma migrate dev
npm run dev
```
